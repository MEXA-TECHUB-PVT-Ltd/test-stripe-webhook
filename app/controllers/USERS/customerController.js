const Emailtemplate = require("../../EmailUtils");
const { pool } = require("../../config/db.config");
const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto");

exports.registerCustomer = async (req, res, next) => {
    const client = await pool.connect();
    try {
        const {
            user_name,
            email,
            password,
            signup_google,
            access_token

        } = req.body;
        // const company_user = false;
        if (email === null || email === "" || email === undefined) {
            res.json({ error: true, message: "Please Provide User Email" });

        } else {
            const userDataCheck = await pool.query("SELECT * FROM users WHERE email=$1",
                [email]);

            if (userDataCheck.rows.length === 0) {
                if (signup_google === true || signup_google === "true") {
                    const userData = await pool.query("INSERT INTO users(user_name,signup_google,email,access_token) VALUES($1,$2,$3,$4) returning *",
                        [
                            user_name,
                            signup_google,
                            email,
                            access_token || null
                        ])
                    const data = userData.rows[0]
                    if (userData.rows.length === 0) {
                        res.json({ error: true, data, message: "Can't Create User" });


                    } else {
                        res.json({ error: false, data, message: "User Created Successfully" });

                    }
                } else {
                    const salt = "mySalt";
                    const hashedPassword = crypto
                        .createHash("sha256")
                        .update(password + salt)
                        .digest("hex");
                    const userData = await pool.query("INSERT INTO users(user_name,signup_google,email,password,access_token) VALUES($1,$2,$3,$4,$5) returning *",
                        [
                            user_name,
                            signup_google,
                            email,
                            hashedPassword,
                            access_token || null
                        ])
                    const data = userData.rows[0]
                    if (userData.rows.length === 0) {
                        res.json({ error: true, data, message: "Can't Create User" });


                    } else {
                        res.json({ error: false, data, message: "User Created Successfully" });

                    }
                }




            } else {
                const data = userDataCheck.rows[0]
                res.json({ error: true, data, message: "Email Already Exist" });

            }
        }




    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }

}

exports.login = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            email,
            password,
            signup_google_user,
            access_token

        } = req.body;
        // const company_user = false;
        if (email === null || email === "" || email === undefined) {
            res.json({ error: true, message: "Please Provide Email" });

        } else {
            const userDataCheck = await pool.query("SELECT * FROM users WHERE email=$1",
                [email]);

            if (userDataCheck.rows.length === 0) {
                res.json({ error: true, data: [], message: "No User exist for this email" });


            } else {
                console.log(userDataCheck.rows[0])
                const signup_google = userDataCheck.rows[0].signup_google
                const user_id = userDataCheck.rows[0].user_id

                if (userDataCheck.rows[0].type === 'Admin') {
                    // login 
                    const hashedPasswordFromDb = userDataCheck.rows[0].password;

                    if (hashedPasswordFromDb === password) {
                        res.json({
                            error: false,
                            data: userDataCheck.rows[0],
                            message: "Login Successfully",
                        });
                    } else {
                        res.json({ error: true, message: "Invalid Credentials" });
                    }
                } else {
                    if (signup_google === true || signup_google === "true") {
                        console.log(userDataCheck.rows[0].signup_google)
                        if (signup_google_user === true || signup_google_user === "true") {
                            let query = 'UPDATE users SET ';
                            let index = 2;
                            let values = [user_id];

                            if (access_token) {
                                query += `access_token = $${index} , `;
                                values.push(access_token)
                                index++
                            }
                            query += 'WHERE user_id = $1 RETURNING*'
                            query = query.replace(/,\s+WHERE/g, " WHERE");


                            const result = await pool.query(query, values)
                            if (result.rows.length === 0) {
                                res.json({ error: true, data: [], message: "Something went wrong" });

                            } else {
                                res.json({ error: false, data: result.rows, message: "User Login Successfully" });

                            }
                        } else {
                            // not signed up with google 
                            res.json({ error: true, data: userDataCheck.rows[0], signedupgoogle: "true", message: "User Login Successfully" });

                        }
                    } else {
                        // login 
                        const salt = "mySalt";
                        const hashedPasswordFromDb = userDataCheck.rows[0].password;
                        const hashedUserEnteredPassword = crypto
                            .createHash("sha256")
                            .update(password + salt)
                            .digest("hex");


                        if (hashedPasswordFromDb === hashedUserEnteredPassword) {
                            res.json({
                                error: false,
                                data: userDataCheck.rows[0],
                                message: "Login Successfully",
                            });
                        } else {
                            res.json({ error: true, message: "Invalid Credentials" });
                        }
                    }

                }
            }
        }

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.verifyEmail = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            email,

        } = req.body;
        // const company_user = false;
        if (email === null || email === "" || email === undefined) {
            res.json({ error: true, message: "Please Provide Email" });

        } else {
            const userDataCheck = await pool.query("SELECT * FROM users WHERE email=$1",
                [email]);

            if (userDataCheck.rows.length === 0) {
                res.json({ error: true, message: "Email is not Registered" });
            } else {

                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const subject = "Verification Email "
                const message = "Here is your Otp code for verification ."
                res.json({ error: false, otp: otp, message: "Email Sent Successfully" });
                Emailtemplate(email, otp, subject, message)
            }
        }

    }
    catch (err) {
        res.json({ error: true, data: err, message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.updateUsername = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            user_name,
            user_id

        } = req.body;
        // const company_user = false;
        if (user_id === null || user_id === "" || user_id === undefined) {
            res.json({ error: true, message: "Please Provide User Id" });

        } else {
            let query = 'UPDATE users SET ';
            let index = 2;
            let values = [user_id];

            if (user_name) {
                query += `user_name = $${index} , `;
                values.push(user_name)
                index++
            }
            query += 'WHERE user_id = $1 RETURNING*'
            query = query.replace(/,\s+WHERE/g, " WHERE");


            const result = await pool.query(query, values)

            if (result.rows.length === 0) {
                res.json({ error: true, data: [], message: "Something went wrong" });

            } else {
                res.json({ error: false, data: result.rows, message: "User Updated Successfully" });

            }

        }

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}
exports.updatePassword = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            email,
            password
        } = req.body;
        const salt = "mySalt";
        const hashedPassword = crypto
            .createHash("sha256")
            .update(password + salt)
            .digest("hex");
        // const company_user = false;
        if (email === null || email === "" || email === undefined) {
            res.json({ error: true, message: "Please Provide Email" });

        } else {
            let query = 'UPDATE users SET ';
            let index = 2;
            let values = [email];

            if (hashedPassword) {
                query += `password = $${index} , `;
                values.push(hashedPassword)
                index++
            }
            query += 'WHERE email = $1 RETURNING*'
            query = query.replace(/,\s+WHERE/g, " WHERE");
            const result = await pool.query(query, values)

            if (result.rows.length === 0) {
                res.json({ error: true, data: [], message: "Something went wrong" });

            } else {
                res.json({ error: false, data: result.rows, message: "Password Updated Successfully" });

            }

        }

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}


exports.admingetAllCustomers = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            user_id,
            type
        } = req.body;
        if (type === null || type === undefined || type === "") {
            // when type null show only admin 
            const query = 'SELECT * FROM users WHERE type =$1'
            const result = await pool.query(query, ["admin"]);
            // get messages 
            const Data = result.rows
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
                    uniq_id: Data[i].uniq_id,
                    user_name: Data[i].user_name,
                    otp: Data[i].otp,
                    verifyStatus: Data[i].verifyStatus,
                    otpExpires: Data[i].otpExpires,
                    type: Data[i].type,
                    email: Data[i].email,
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
        } else {

            // type admin (show all users )
            const query = 'SELECT * FROM users WHERE user_id <> $1'
            const result = await pool.query(query, [user_id]);
            // get messages 
            const Data = result.rows
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
exports.getUserByUniqId = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            uniq_id,
        } = req.body;
        //    const type="admin"
        const query = 'SELECT * FROM users WHERE uniq_id =$1 '
        const result = await pool.query(query, [uniq_id]);
        // get messages 
        // const Data= result.rows

        if (result.rows.length === 0) {
            res.json({
                message: "could not fetch",
                error: true,
            })

        }
        else {
            res.json({
                message: "All Users Fetched",
                status: true,
                result: result.rows[0]
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

exports.logout = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            user_id,

        } = req.body;
        // const company_user = false;
        if (!user_id) return res.json({ msg: "User id is required " });
        onlineUsers.delete(req.user_id);
        res.json({ error: false, message: "Logout Successfully" });

    }
    catch (err) {
        res.json({ error: true, data: [], message: "Catch eror" });

    } finally {
        client.release();
    }
}

