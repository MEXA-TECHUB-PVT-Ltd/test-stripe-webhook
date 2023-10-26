const { pool } = require("../../config/db.config");
const logStripeAction = require("../../maintainLog");
const { SECRET_KEY, PUBLISHABLE_KEY } = require('../../stripe_keys');
const stripe = require('stripe')(SECRET_KEY)
exports.createPackage = async (req, res, next) => {

    const client = await pool.connect();
    try {
        const {
            package_name,
            stripe_price_id,
            product_id,
            package_price,
            type,
            description,
            features

        } = req.body;
        // const company_user = false;
        // console.log("Received Request Body:", req.body);
        if (product_id === null || product_id === "" || product_id === undefined) {
            res.json({ error: true, message: "Please Provide Product Id " });

        } else {
          
          
                    const userData = await pool.query("INSERT INTO packages(package_name,product_id,package_price,type,description,feature,stripe_price_id) VALUES($1,$2,$3,$4,$5,$6,$7) returning *",
                        [
                            package_name,
                            product_id,
                            package_price,
                            type,
                            description,
                            features,
                            stripe_price_id
                        ])
                    if (userData.rows.length === 0) {
                        res.json({ error: true, data: [], message: "Can't Create Package" });


                    } else {
                        // logStripeAction('Create Price', [{ name: package_name, price: package_price, description, type }], [{ result: product }], 'success');

                        const data = userData.rows[0]
                        res.json({
                            error: false, data: {
                                publishableKey: PUBLISHABLE_KEY,
                                prices: data,
                            }, message: "Pricing Created Successfully"
                        });

                    }
        }
    }
    catch (err) {
        res.json({ error: true, data: err, message: "Catch eror" });

    } finally {
        client.release();
    }

}
exports.updatePackage = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            package_name,
            package_id,
            description,
            features

        } = req.body;
        // const company_user = false;
        if (package_id === null || package_id === "" || package_id === undefined) {
            res.json({ error: true, message: "Please Provide Product Id " });

        } else {
            // console.log(features)
            // console.log(features.join(', '))

            const productData = {
                nickname: package_name,
                metadata: {
                    'description': description,
                    'features': features.join(', '),
                    // Add any other custom key-value pairs you need
                },
                // Add other product attributes as needed
            };
            stripe.prices.update(package_id, productData, (err, product) => {
                console.log(product)
                if (err) {
                    console.log(err);
                } else {
                    //   console.log('Product created:', product);
                    res.json({
                        error: false,
                        data: {
                            publishableKey: PUBLISHABLE_KEY,
                            prices: product,
                        }, message: "Pricing Updated Successfully"
                    });
                }
            });
            // const price = await stripe.prices.create({
            //     unit_amount: package_price,
            //     currency: 'usd',
            //     recurring: { interval: 'month' },
            //     type: "recurring",
            //     product: product_id,
            //     nickname: package_name
            // });
            // res.json({ error: false, data: price, message: "Package Created Successfully" });

            // const userDataCheck = await pool.query("SELECT * FROM products WHERE product_id=$1",
            //     [product_id]);

            // if (userDataCheck.rows.length === 0) {
            //     res.json({ error: true, data: [], message: "No Product Exist for thid Id." });



            // } else {

            //     const userData = await pool.query("INSERT INTO packages(package_name,product_id,package_price,type,description) VALUES($1,$2,$3,$4,$5) returning *",
            //         [
            //             package_name,
            //             product_id,
            //             package_price,
            //             type,
            //             description
            //         ])
            //     if (userData.rows.length === 0) {
            //         res.json({ error: true, data:[], message: "Can't Create Package" });


            //     } else {
            //     const data = userData.rows[0]

            //         res.json({ error: false, data, message: "Package Created Successfully" });

            //     }

            // }
        }




    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.deletePackage = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            Package_id,
            active
        } = req.body;
        // const company_user = false;
        if (Package_id === null || Package_id === "" || Package_id === undefined) {
            res.json({ error: true, message: "Please Provide Package Id" });

        } else {
            const productData = {
                active: active,
            };
            stripe.prices.update(Package_id, productData, (err, product) => {
                if (err) {
                    console.error(err);
                } else {
                    //   console.log('Product created:', product);
                    res.json({
                        error: false, data: {
                            publishableKey: PUBLISHABLE_KEY,
                            prices: product,
                        }, message: "Pricing Created Successfully"
                    });
                }
            });


        }

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.deleteAllPackage = async (req, res) => {
    const client = await pool.connect();
    try {
        const deleteUserQuery = await pool.query(
            "DELETE FROM Packages"
        );

        // Check if any rows were deleted
        if (deleteUserQuery.rowCount === 0) {
            res.json({ error: true, message: "Cannot Delete Package" });

        } else {
            res.json({ error: false, message: "All Package Deleted Successfully" });

        }

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.getAllCustomers = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            user_id,
        } = req.body;
        //    const type="admin"
        const query = 'SELECT * FROM users WHERE user_id <> $1 '
        const result = await pool.query(query, [user_id]);
        // get messages 
        // const Data= result.rows
        const Data = result.rows.filter(user => user.type !== 'admin');
        let Array = [];
        for (let i = 0; i < Data.length; i++) {
            const customerId = Data[i].user_id
            const queryText = `
            SELECT sender = $1 AS from_self, message AS message,type AS type,
            readStatus AS readStatus,
            created_at AS created_at
            FROM messages
            WHERE (sender = $1 AND to_user = $2) OR (sender = $2 AND to_user = $1)
            ORDER BY created_at ASC 
          `;

            let resultMessages = await client.query(queryText, [user_id, customerId]);
            // Filter the array to get objects with readstatus false and from_self false
            const filteredResults = resultMessages.rows.filter((row) => {
                return row.readstatus === "false" && row.from_self === false;
            });
            Array.push({
                user_id: Data[i].user_id,
                email: Data[i].email,
                password: Data[i].password,
                image: Data[i].image,
                user_name: Data[i].user_name,
                uniq_id: Data[i].uniq_id,
                unreadMessages: filteredResults.length
            })
        }


        if (result.rows) {
            res.json({
                message: "All Users Fetched",
                status: true,
                result: Array
            })
        }
        else {
            res.json({
                message: "could not fetch",
                status: false,
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
    }
}
exports.getPackageByProductId = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            product_id,
        } = req.body;
        //    const type="admin"
        const query = 'SELECT * FROM packages WHERE product_id =$1 '
        const result = await pool.query(query, [product_id]);

        const query1 = 'SELECT * FROM products WHERE product_id =$1 '
        const result1 = await pool.query(query1, [product_id]);
        // get messages 
        const Data = result1.rows[0]//product
        // console.log(Data)
        // const prices = await stripe.prices.list({
        //     // lookup_keys: ['Monthly', 'sample_premium'],
        //     // lookup_keys: ['standard-monthly'],
        //     product: product_id,
        //     expand: ['data.product'],
        //     active: true
        // });
        // get messages 
        // const Data= result.rows

        // const productData = {
        //     product: product_id,
        //     expand: ['data.product'],

        // };
        // stripe.prices.list(productData, (err, product) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         //   console.log('Product created:', product);
        res.json({
            error: false, data: {
                publishableKey: PUBLISHABLE_KEY,
                prices: result.rows,
                product:Data,
            }, message: "Pricing Get Successfully"
        });
        //     }
        // });
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
    }
}
exports.getPackageByPriceId = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            price_id,
        } = req.body;
        //    const type="admin"
        // const query = 'SELECT * FROM users WHERE uniq_id =$1 '
        // const result = await pool.query(query, [uniq_id]);
        // const prices = await stripe.prices.list({
        //     // lookup_keys: ['Monthly', 'sample_premium'],
        //     // lookup_keys: ['standard-monthly'],
        //     product: product_id,
        //     expand: ['data.product'],
        //     active: true
        // });
        // get messages 
        // const Data= result.rows

        // const productData = {
        //     product: product_id,
        //     expand: ['data.product'],

        // };
        // const price = await stripe.prices.retrieve(
        //     price_id
        //   );
        stripe.prices.retrieve(price_id, (err, product) => {
            if (err) {
                console.error(err);
            } else {
                //   console.log('Product created:', product);
                res.json({
                    error: false, data: {
                        publishableKey: PUBLISHABLE_KEY,
                        prices: product,
                    }, message: "Pricing Get Successfully"
                });
            }
        });
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
    }
}

