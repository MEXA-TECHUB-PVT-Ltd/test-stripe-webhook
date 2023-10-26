
const express = require('express');
const app = express();
const crypto = require("crypto");

// const socket = require("socket.io");
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require("cors");
const { SECRET_KEY,PUBLISHABLE_KEY } = require('./app/stripe_keys');
const { pool } = require('./app/config/db.config');
const EmailLinkButton = require('./app/EmailLinkButton');
console.log(SECRET_KEY)
const stripe = require('stripe')(SECRET_KEY)

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
let endpointSecret;
endpointSecret = "whsec_8a06d25c9385a493e80dff96808dfaeab19203a36fe0d8c2e6bd199dd69a8a27";

// webhook 
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  // const sig = request.headers['stripe-signature'];
  // if (endpointSecret) {

  //   const signature = request.headers['stripe-signature'];
  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       request.body,
  //       signature,
  //       endpointSecret
  //     );
  //   } catch (err) {
  //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //     return response.sendStatus(400);
  //   }
  // }
  // let subscription;
  // let status;

  // switch (event.type) {
  //   case 'customer.subscription.created': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(`Subscription status is ${status}.`);
  //     break;
  //   }
  //   case 'payment_intent.succeeded': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(`paymnt succeeded is ${status}.`);
  //     break;
  //   }
  //   case 'invoice.payment_succeeded': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(` invoice paymnt succeeded is ${status}.`);
  //     break;
  //   }
  //   case 'invoice.payment_failed': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(` invoice paymnt succeeded is ${status}.`);
  //     break;
  //   }
  //   case 'customer.subscription.deleted': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(` invoice paymnt succeeded is ${status}.`);
  //     break;
  //   }
  //   case 'customer.subscription.updated': {
  //     subscription = event.data.object;
  //     status = subscription.status;
  //     console.log(` invoice paymnt succeeded is ${status}.`);
  //     if (subscription.status === 'active') {
  //       // Handle active subscriptions.
  //     } else {
  //       // Handle other subscription statuses.
  //     }
  //     break;
  //   }
   

  //   // Here called Node mailer 


  //   default:
  //     console.log(`Unhandled event type ${event.type}.`);
  // }
  // response.send();
  // start 
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object;
      console.log('customer.created')
      // logs maintain 
      // Then define and call a function to handle the event customer.created
      break;
    case 'customer.deleted':
      const customerDeleted = event.data.object;
      // Then define and call a function to handle the event customer.deleted
      break;
    case 'customer.updated':
      const customerUpdated = event.data.object;
      console.log('customer.updated')

      // Then define and call a function to handle the event customer.updated
      break;
    case 'customer.discount.created':
      const customerDiscountCreated = event.data.object;
      console.log('customer.discount.created')

      // Then define and call a function to handle the event customer.discount.created
      break;
    case 'customer.discount.deleted':
      const customerDiscountDeleted = event.data.object;
      // Then define and call a function to handle the event customer.discount.deleted
      break;
    case 'customer.discount.updated':
      const customerDiscountUpdated = event.data.object;
      // Then define and call a function to handle the event customer.discount.updated
      break;
    case 'customer.source.created':
      const customerSourceCreated = event.data.object;
      // Then define and call a function to handle the event customer.source.created
      break;
    case 'customer.source.deleted':
      const customerSourceDeleted = event.data.object;
      // Then define and call a function to handle the event customer.source.deleted
      break;
    case 'customer.source.expiring':
      const customerSourceExpiring = event.data.object;
      // Then define and call a function to handle the event customer.source.expiring
      break;
    case 'customer.source.updated':
      const customerSourceUpdated = event.data.object;
      // Then define and call a function to handle the event customer.source.updated
      break;
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object;
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case 'customer.subscription.paused':
      const customerSubscriptionPaused = event.data.object;
      // Then define and call a function to handle the event customer.subscription.paused
      break;
    case 'customer.subscription.pending_update_applied':
      const customerSubscriptionPendingUpdateApplied = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_applied
      break;
    case 'customer.subscription.pending_update_expired':
      const customerSubscriptionPendingUpdateExpired = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_expired
      break;
    case 'customer.subscription.resumed':
      const customerSubscriptionResumed = event.data.object;
      // Then define and call a function to handle the event customer.subscription.resumed
      break;
    case 'customer.subscription.trial_will_end':
      const customerSubscriptionTrialWillEnd = event.data.object;
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case 'customer.tax_id.created':
      const customerTaxIdCreated = event.data.object;
      // Then define and call a function to handle the event customer.tax_id.created
      break;
    case 'customer.tax_id.deleted':
      const customerTaxIdDeleted = event.data.object;
      // Then define and call a function to handle the event customer.tax_id.deleted
      break;
    case 'customer.tax_id.updated':
      const customerTaxIdUpdated = event.data.object;
      // Then define and call a function to handle the event customer.tax_id.updated
      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;
      // Then define and call a function to handle the event invoice.created
      break;
    case 'invoice.deleted':
      const invoiceDeleted = event.data.object;
      // Then define and call a function to handle the event invoice.deleted
      break;
    case 'invoice.finalization_failed':
      const invoiceFinalizationFailed = event.data.object;
      // Then define and call a function to handle the event invoice.finalization_failed
      break;
    case 'invoice.finalized':
      const invoiceFinalized = event.data.object;
      // Then define and call a function to handle the event invoice.finalized
      break;
    case 'invoice.marked_uncollectible':
      const invoiceMarkedUncollectible = event.data.object;
      // Then define and call a function to handle the event invoice.marked_uncollectible
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.object;
      // Then define and call a function to handle the event invoice.paid
      break;
    case 'invoice.payment_action_required':
      const invoicePaymentActionRequired = event.data.object;
      // Then define and call a function to handle the event invoice.payment_action_required
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    case 'invoice.sent':
      const invoiceSent = event.data.object;
      // Then define and call a function to handle the event invoice.sent
      break;
    case 'invoice.upcoming':
      const invoiceUpcoming = event.data.object;
      // Then define and call a function to handle the event invoice.upcoming
      break;
    case 'invoice.updated':
      const invoiceUpdated = event.data.object;
      // Then define and call a function to handle the event invoice.updated
      break;
    case 'invoice.voided':
      const invoiceVoided = event.data.object;
      // Then define and call a function to handle the event invoice.voided
      break;
    case 'payment_intent.amount_capturable_updated':
      const paymentIntentAmountCapturableUpdated = event.data.object;
      // Then define and call a function to handle the event payment_intent.amount_capturable_updated
      break;
    case 'payment_intent.canceled':
      const paymentIntentCanceled = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.partially_funded':
      const paymentIntentPartiallyFunded = event.data.object;
      // Then define and call a function to handle the event payment_intent.partially_funded
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case 'payment_intent.processing':
      const paymentIntentProcessing = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case 'payment_intent.requires_action':
      const paymentIntentRequiresAction = event.data.object;
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case 'plan.created':
      const planCreated = event.data.object;
      // Then define and call a function to handle the event plan.created
      break;
    case 'plan.deleted':
      const planDeleted = event.data.object;
      // Then define and call a function to handle the event plan.deleted
      break;
    case 'plan.updated':
      const planUpdated = event.data.object;
      // Then define and call a function to handle the event plan.updated
      break;
    case 'price.created':
      const priceCreated = event.data.object;
      // Then define and call a function to handle the event price.created
      break;
    case 'price.deleted':
      const priceDeleted = event.data.object;
      // Then define and call a function to handle the event price.deleted
      break;
    case 'price.updated':
      const priceUpdated = event.data.object;
      // Then define and call a function to handle the event price.updated
      break;
    case 'product.created':
      const productCreated = event.data.object;
      // Then define and call a function to handle the event product.created
      break;
    case 'product.deleted':
      const productDeleted = event.data.object;
      // Then define and call a function to handle the event product.deleted
      break;
    case 'product.updated':
      const productUpdated = event.data.object;
      // Then define and call a function to handle the event product.updated
      break;
    case 'subscription_schedule.aborted':
      const subscriptionScheduleAborted = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.aborted
      break;
    case 'subscription_schedule.canceled':
      const subscriptionScheduleCanceled = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.canceled
      break;
    case 'subscription_schedule.completed':
      const subscriptionScheduleCompleted = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.completed
      break;
      case 'checkout.session.completed':
      const CheckoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.completed
      break;
    case 'subscription_schedule.created':
      const subscriptionScheduleCreated = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.created
      break;
    case 'subscription_schedule.expiring':
      const subscriptionScheduleExpiring = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.expiring
      break;
    case 'subscription_schedule.released':
      const subscriptionScheduleReleased = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.released
      break;
    case 'subscription_schedule.updated':
      const subscriptionScheduleUpdated = event.data.object;
      // Then define and call a function to handle the event subscription_schedule.updated
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
  // end 

  // Return a 200 response to acknowledge receipt of the event
});
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/uploads', express.static('uploads'))

app.use('/upload-image', require('./app/upload-image'))

app.use("/user", require("./app/routes/Users/customerRoute"))
app.use("/messages", require("./app/routes/Messages/messagesRoute"))
// Products 
app.use("/product", require("./app/routes/Product/productRoute"))
// Product Package 
app.use("/package", require("./app/routes/Package/PackageRoute"))
//Package Features
app.use("/features", require("./app/routes/Features/featuresRoute"))
// Logs 
app.use("/logs", require("./app/routes/Logs/logsRoute"))
// company
app.use("/company", require("./app/routes/FeaturedCompanies/featuredCompaniesRoute"))



// Stripe 
// create product 
// create price list 
app.post('/create-product', async (req, res) => {
  // "Unlimited Searches;Access to all gpt engine;AnyFeature 3" 
  // split by semi colon 
  // console.log(req.body.features)
  const prices = await stripe.products.create({
   name:req.body.name,
   description:req.body.description,

  });

  res.send({
    publishableKey: PUBLISHABLE_KEY,
    prices: prices,
  });
});
// create price list 
app.post('/create-pricing', async (req, res) => {
  // "Unlimited Searches;Access to all gpt engine;AnyFeature 3" 
  // split by semi colon 
  console.log(req.body.features)
  const prices = await stripe.prices.create({
    product: req.body.product_id,
    unit_amount: req.body.unit_amount,
    currency: 'usd',
    recurring: {
      interval: req.body.interval,
      trial_period_days: req.body.trial_period_days,
    },
    metadata: {
      featuresList: req.body.features
    },
    lookup_key: req.body.lookup_key,
    nickname: req.body.description
  });

  res.send({
    publishableKey: PUBLISHABLE_KEY,
    prices: prices,
  });
});
// Update price list 
app.post('/update-pricing', async (req, res) => {
  const prices = await stripe.prices.update(req.body.price_Id, {
    // unit_amount: req.body.unit_amount,
    // currency: 'usd',
    // recurring: {
    //   interval: req.body.interval,
    //   trial_period_days: req.body.trial_period_days,
    // },
    metadata: {
      featuresList: req.body.features
    },
    lookup_key: req.body.lookup_key,
    nickname: req.body.description,
    active: req.body.active
  });

  res.send({
    publishableKey: PUBLISHABLE_KEY,
    prices: prices,
  });
});
// Update product 
app.post('/set-default-pricing', async (req, res) => {
  const product = await stripe.products.update(
    req.body.product_id,
    {
      default_price: req.body.price_Id,
    }
  );

  res.send({
    publishableKey: PUBLISHABLE_KEY,
    prices: product,
  });
});
// get ALL price list 
app.post('/get-all-pricing', async (req, res) => {
  const prices = await stripe.prices.list({
    // lookup_keys: ['Monthly', 'sample_premium'],
    // lookup_keys: ['standard-monthly'],
    product: req.body.product_id,
    expand: ['data.product'],
    active: true
  });

  res.send({
    publishableKey: PUBLISHABLE_KEY,
    prices: prices.data,
    error: false,
    message: "All Pricing Details Fetched successfully"
  });

});
// get price list Single 
app.post('/get-single-pricing-by-product', async (req, res) => {
  const prices = await stripe.prices.list({
    // lookup_keys: ['Monthly', 'sample_premium'],
    lookup_keys: req.body.lookup_keys,
    product: req.body.product_id,
    expand: ['data.product'],
    active: true
  });

  res.send({
    publishableKey: PUBLISHABLE_KEY ,
    prices: prices.data,
  });

});
// get price list 
app.post('/check-subscription', async (req, res) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: req.body.customer_Stripe_Id,
    limit: 1,
  });

  const subscription = subscriptions.data[0];

  if (subscription.status === 'active') {
    res.json({ message: 'Subscription is active!', status: true });
  } else {
    res.json({ message: 'Subscription is not active!', status: false });
  }

});
// Cancel 
app.post('/cancel-subscription', async (req, res) => {
  const updatedSubscription = await stripe.subscriptions.update(
    req.body.subscription_id,
    {
      cancel_at_period_end: true,
    }
  );
  res.json({ message: 'Subscription canceled at the end of the billing period:', data: updatedSubscription });

});
// true pricing Table  using 
app.post('/get-pricing-table-prices', async (req, res) => {
  const prices = await stripe.prices.list({
    // lookup_keys: ['Monthly', 'sample_premium'],
    lookup_keys: req.body.lookup_keys,
    product: req.body.product_id,
    expand: ['data.product'],
    active: true
  });

  res.send({
    publishableKey: PUBLISHABLE_KEY ,
    prices: prices.data,
  });

});
// true checkout using 
function generateRandomPassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const password = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password.push(charset[randomIndex]);
  }

  return password.join('');
}


// app.post("/checkout", async (req, res) => {
//   const email = req.body.customeremail
//   const username = email.split('@')[0];
//   try {
//     const existingCustomer = await stripe.customers.list({ email });
// // Check customer Exist 
// let customer,user_id;
// console.log('datac')
//     if (existingCustomer.data.length === 0) {
//       // Customer already exists
//       console.log("customer no exist ")
//        customer = await stripe.customers.create({
//           email: email,
//           name:username,
//           payment_method: req.body.paymentMethodId,
//           metadata: {
//             userId: "1234"
//           }
//         });
//         // console.log(customer)
// // create user
// // Random Password Generate 
// const passwordLength = 12; // You can change the length as needed
// const randomPassword = generateRandomPassword(passwordLength);

// const salt = "mySalt";
// const hashedPassword = crypto
// .createHash("sha256")
// .update(randomPassword + salt)
// .digest("hex");
//  const dataUser=await pool.query("INSERT INTO users(user_name,email,password,stripe_customer_id) VALUES($1,$2,$3,$4) returning *",
// [
//   username,
//     email,
//     hashedPassword,
//     customer.id

// ])
//  user_id = dataUser.rows[0].user_id

//     }else{
//        console.log("customer exist ")
//       //  res.status(400).json({ error: 'Customer already exists' });
//        customer=existingCustomer.data[0]
//       //  get all users of this id 
//       let result = await pool.query(`SELECT * FROM users WHERE email='${email}'`)
// // console.log(result)
// user_id=result.rows[0].user_id
//     }
//     // Payment Method Attach 
//   await stripe.paymentMethods.attach(req.body.paymentMethodId, {
//     customer: customer.id,
//   });
//   // console.log(subscription)

//   // Update the customer to set the default payment method
//   await stripe.customers.update(customer.id, {
//     invoice_settings: {
//       default_payment_method: req.body.paymentMethodId,
//     },
//   });
// // start 
//   //  get all users of this id 
//   let resultPrevsubscription = await pool.query(`SELECT * FROM subscriptions WHERE user_id='${user_id}' AND status='active'`)
//   console.log(resultPrevsubscription)
//   if(resultPrevsubscription.rows.length===0){
// // new subscription 
// //  Now create the subscription with the customer's default payment method
//   const subscription = await stripe.subscriptions.create({
//     customer: customer.id,
//     items: [{ price: req.body.priceId }],
//   });
//   // console.log(subscription)
//   if (subscription.status === "active") {
//     console.log("active")
//     // check previous subscription 
//     const price_id=req.body.priceId
//     const payment_method_id=req.body.paymentMethodId
//     const status=subscription.status
//     const stripe_subscription_id=subscription.id
//     const type='created'
//     const subscriptionDB = await pool.query("INSERT INTO subscriptions(price_id,user_id,type,status,payment_method_id,stripe_subscription_id) VALUES($1,$2,$3,$4,$5,$6) returning *",
//     [
//       price_id,
//       user_id,
//       type,
//       status,
//       payment_method_id,
//       stripe_subscription_id
//     ])
// const data = subscriptionDB.rows[0]
//     res.status(200).json({
//       success: true,
//       subscriptionObject:subscription,
//       message: "Subscription created successfully",
//     });
//   } else {
//     console.log("Inactive")

//     if (subscription.status === "incomplete") {
//       // Extract the latest invoice to get the decline reason.
//       // console.log(subscription.latest_invoice)
//       const latestInvoice = subscription.latest_invoice;
//       const invoice = await stripe.invoices.retrieve(latestInvoice);
//       console.log(invoice.payment_intent)
//       // start 



//       // end 
//       const paymentIntentId=invoice.payment_intent
//       // const declineReason = invoice.payment_intent.last_payment_error.message;
//       const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//       // Access the status of the payment intent
//       const paymentIntentStatus = paymentIntent;
      
//       console.log('Payment Intent Status:', paymentIntentStatus);
//       // res.status(400).json({
//       //   error: true,
//       //   message: "Card declined: " + declineReason,
//       // });
//     } else {
//       res.status(400).json({
//         error: true,
//         message: "Something went wrong with the subscription",
//       });
//     }
//   }
//   }else{
// // exist prev subscription 
// const subId=resultPrevsubscription.rows[0].stripe_subscription_id
// const subscriptionCancelled = await stripe.subscriptions.cancel(subId);
// const status='cancel'
// console.log(subscriptionCancelled)
// // update status active on db 
// let query = 'UPDATE subscriptions SET ';
// let index = 2;
// let values = [subId];

// if (status) {
//     query += `status = $${index} , `;
//     values.push(status)
//     index++
// }
// query += 'WHERE stripe_subscription_id = $1 RETURNING*'
// query = query.replace(/,\s+WHERE/g, " WHERE");
// const result = await pool.query(query, values)
// if(result.rows.length===0){
//   res.status(400).json({
//     error: true,
//     message: 'Not Upadted Subscription'
//   });
// }else{
// // create subscription 
// const subscription = await stripe.subscriptions.create({
//   customer: customer.id,
//   items: [{ price: req.body.priceId }],
// });
// // console.log(subscription)
// if (subscription.status === "active") {
//   console.log("active")
//   // check previous subscription 
//   const price_id=req.body.priceId
//   const payment_method_id=req.body.paymentMethodId
//   const status=subscription.status
//   const stripe_subscription_id=subscription.id
//   const type='updated'
//   const subscriptionDB = await pool.query("INSERT INTO subscriptions(price_id,user_id,type,status,payment_method_id,stripe_subscription_id) VALUES($1,$2,$3,$4,$5,$6) returning *",
//   [
//     price_id,
//     user_id,
//     type,
//     status,
//     payment_method_id,
//     stripe_subscription_id
//   ])
// const data = subscriptionDB.rows[0]
//   res.status(200).json({
//     success: true,
//     subscriptionObject:subscription,
//     message: "Subscription updated successfully",
//   });
// } else {
//   console.log("Inactive")

//   if (subscription.status === "incomplete") {
//     // Extract the latest invoice to get the decline reason.
//     // console.log(subscription.latest_invoice)
//     const latestInvoice = subscription.latest_invoice;
//     const invoice = await stripe.invoices.retrieve(latestInvoice);
//     console.log(invoice.payment_intent)
//     const paymentIntentId=invoice.payment_intent
//     // const declineReason = invoice.payment_intent.last_payment_error.message;
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//     // Access the status of the payment intent
//     const paymentIntentStatus = paymentIntent;
    
//     console.log('Payment Intent Status:', paymentIntentStatus);
//     // res.status(400).json({
//     //   error: true,
//     //   message: "Card declined: " + declineReason,
//     // });
//   } else {
//     res.status(400).json({
//       error: true,
//       message: "Something went wrong with the subscription",
//     });
//   }
// }
// }

//   }

// } catch (error) {
//   console.error("Error:", error);
//   res.status(400).json({
//     error: true,
//     message: error.message
//   });
// }
// })





//  Checkout Functions 
// Function to create a new customer if they don't exist
async function createCustomer(email, username, paymentMethodId) {
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: username,
      payment_method: paymentMethodId,
      metadata: {
        userId: "1234"
      }
    });
    return customer;
  } catch (error) {
    throw error;
  }
}

// Function to create a new user in the database
async function createUser(username, email, hashedPassword, customerId) {
  try {
    const dataUser = await pool.query("INSERT INTO users(user_name,email,password,stripe_customer_id) VALUES($1,$2,$3,$4) returning *",
      [username, email, hashedPassword, customerId]);
    return dataUser.rows[0].user_id;
  } catch (error) {
    throw error;
  }
}

// Function to retrieve an existing customer
async function getExistingCustomer(email) {
  try {
    const existingCustomer = await stripe.customers.list({ email });
    return existingCustomer;
  } catch (error) {
    throw error;
  }
}

// Function to handle payment method attachment
async function attachPaymentMethod(paymentMethodId, customerId) {
  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  } catch (error) {
    throw error;
  }
}

// Function to update customer's default payment method
async function updateDefaultPaymentMethod(customerId, paymentMethodId) {
  try {
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId }
    });
  } catch (error) {
    throw error;
  }
}

// Function to create a new subscription
async function createSubscription(customerId, priceId) {
  try {
    if (!priceId) {
      console.log("pwerhsdghhfdsdfs")
      throw new Error("Price ID is missing");
    }
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }]
    });
    return subscription;
  } catch (error) {
    throw error;
  }
}
 // Function to handle successful subscription creation
async function handleSuccessfulSubscriptionCreation(password,email,user_id, req, res, subscription) {
  try {
    const price_id = req.body.priceId;
    const payment_method_id = req.body.paymentMethodId;
    const status = subscription.status;
    const stripe_subscription_id = subscription.id;
    const type = 'created';

    const subscriptionDB = await pool.query("INSERT INTO subscriptions(price_id,user_id,type,status,payment_method_id,stripe_subscription_id) VALUES($1,$2,$3,$4,$5,$6) returning *",
      [price_id, user_id, type, status, payment_method_id, stripe_subscription_id]);

    const data = subscriptionDB.rows[0];

    res.status(200).json({
      success: true,
      subscriptionObject: subscription,
      message: "Subscription created successfully",
    });
    // Email to user 
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "Subscription SuccessFull"
    const resetLink="www.google.com"
    const buttonText="User Portal"

    const message = "You have successfully subscribed to Zipto Here is your password to login to your user portal ."
    // res.json({ error: false, otp: otp, message: "Email Sent Successfully" });
    EmailLinkButton(email, resetLink,buttonText , subject,password, message)

  } catch (error) {
    throw error;
  }
}

// Function to handle incomplete subscription
async function handleIncompleteSubscription(subscription) {
  try {
    const latestInvoice = subscription.latest_invoice;
    const invoice = await stripe.invoices.retrieve(latestInvoice);
    const paymentIntentId = invoice.payment_intent;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const paymentIntentStatus = paymentIntent;

    console.log('Payment Intent Status:', paymentIntentStatus);

    // Additional logic for handling incomplete subscription
    // ...

  } catch (error) {
    throw error;
  }
}

// Function to handle other subscription statuses
async function handleOtherSubscriptionStatuses(res) {
  res.status(400).json({
    error: true,
    message: "Something went wrong with the subscription",
  });
}
// Function to handle the checkout process
app.post("/checkout", async (req, res) => {
  const email = req.body.customeremail;
  const username = email.split('@')[0];
  const paymentMethodId = req.body.paymentMethodId;
  const passwordLength = 12; // You can change the length as needed
const randomPassword = generateRandomPassword(passwordLength);

const salt = "mySalt";
const hashedPassword = crypto
.createHash("sha256")
.update(randomPassword + salt)
.digest("hex");

  try {
    const existingCustomer = await getExistingCustomer(email);
    let customer, user_id;

    if (existingCustomer.data.length === 0) {
      customer = await createCustomer(email, username, paymentMethodId);
      user_id = await createUser(username, email, hashedPassword, customer.id);
    } else {
      customer = existingCustomer.data[0];
      const result = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
     console.log(result.rows)
      user_id = result.rows[0].user_id;
    }

    await attachPaymentMethod(paymentMethodId, customer.id);
    await updateDefaultPaymentMethod(customer.id, paymentMethodId);

    const subscription = await createSubscription(customer.id, req.body.priceId);

    if (subscription.status === "active") {
      // Handle successful subscription creation
      await handleSuccessfulSubscriptionCreation(randomPassword,email,user_id, req, res, subscription);
      // ...
    } else if (subscription.status === "incomplete") {
      // Handle incomplete subscription
      await handleIncompleteSubscription(subscription);
      // ...
    } else {
      // Handle other subscription statuses
      await handleOtherSubscriptionStatuses(res);
      // ...
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      error: true,
      message: error.message
    });
  }
});



// end 


app.post("/get-refund-user-data", async (req, res) => {
  const user_Id = req.body.user_Id;
  TransactionModel.find({ user_Id: user_Id, status: 'succeeded' }, function (err, foundResult) {
    try {
      let ResultData = foundResult.reverse()
      res.status(200).json({ result: ResultData[0], error: false, message: "Get Data Successfully", statusCode: 200 })
    } catch (err) {
      res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    }
  })
});
app.post("/refund_payment", async (req, res) => {
  const { clientSecret, amount } = req.body;
  stripe.paymentIntents.retrieve(clientSecret)
    .then(async paymentIntent => {
      if (paymentIntent.status === 'succeeded') {
        console.log("the payment has been successfully processed and funds have been captured")
        const refund = await stripe.refunds.create({
          payment_intent: clientSecret,
          amount: amount
        });
        res.json(refund)
        TransactionModel.find({ paymentIntent_Secret: clientSecret }, function (err, foundResult) {
          try {
            console.log(foundResult[0]._id)
            const updateData = {
              paymentStatus: 'refund'
            }
            const options = {
              new: true
            }
            TransactionModel.findByIdAndUpdate(foundResult[0]._id, updateData, options, (error, result) => {
              if (error) {
                // res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

              } else {
                // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

              }
            })
            // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

          } catch (err) {
            // res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
          }
        })
      } else if (paymentIntent.status === 'requires_payment_method') {
        res.json({ message: "the payment intent has failed because the payment method attached to it has been declined" })

      } else if (paymentIntent.status === 'requires_confirmation') {
        res.json({ message: "the payment intent is ready to be confirmed with a payment method, but has not yet been confirmed" })

      } else if (paymentIntent.status === 'processing') {
        res.json({ message: " the payment is being processed and not yet complete" })


      } else if (paymentIntent.status === 'requires_capture') {
        res.json({ message: " the payment has been authorized, but not yet captured" })


      } else if (paymentIntent.status === 'canceled') {
        res.json({ message: "the payment has been canceled." })

      }
    })
    .catch(error => {
      console.error(error);
    });

});
// const server =
 app.listen(5000, () => {
  console.log(`
################################################
       Server listening on port: ${PORT}
################################################
`);
});
// const io = socket(server, {
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     // console.log("data",data)
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", {
//         msg: data.msg,
//         type: data.type, 
//         user_id:data.from
//       });
//     }
//   });

//   socket.on("update-unread-messages", (user_id) => {
//     // Implement logic to update unread messages count for the clicked contact/user.
//     // This logic can involve database updates or any other data manipulation.
//     // console.log("user_id")
 
//     // console.log(user_id)
//     // Once the unread messages are updated, you can emit an event to inform the client.
//     socket.emit("unread-messages-updated", user_id);
//   });
//   // admin unread message with type 
//   socket.on("update-unread-messages-admin", (user) => {
//     // Implement logic to update unread messages count for the clicked contact/user.
//     // This logic can involve database updates or any other data manipulation.
//     // console.log("Admin Spocket")
 
//     // console.log(user)
//     // console.log(type)
//     // let Arraydata=[{
//     //   user_id:user_id,
//     //   type:type
//     // }]

//     // Once the unread messages are updated, you can emit an event to inform the client.
//     socket.emit("unread-messages-updated-admin", user);
//   });
// });



