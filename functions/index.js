const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const endpointSecret = functions.config().stripe.webhook_secret;

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

// Handle creating a Payment Intent
exports.createPaymentIntent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    }
  });
});

const app = express();
app.use(bodyParser.raw({ type: "application/json" }));

async function sendConfirmationEmail(orderId, email) {
  const mailOptions = {
    from: functions.config().email.user, // Use the email from config
    to: email,
    subject: "Payment Confirmation",
    text: `Your payment for order ID ${orderId} was successful!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent for Order ID ${orderId}`);
  } catch (error) {
    console.error(`Error sending confirmation email: ${error.message}`);
  }
}

// Stripe webhook handler
app.post("/webhook", (request, response) => {
  const sig = request.headers["stripe-signature"];
  const body = request.body;
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err);
    return response.sendStatus(400);
  }

  // Handle the event
  let intent;
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent was successful!`, paymentIntent.id);

      sendConfirmationEmail(
        paymentIntent.metadata.orderId,
        paymentIntent.metadata.email
      );
      break;
    case "payment_method.automatically_updated":
      intent = event.data.object;
      console.log(`PaymentMethod was automatically updated!`, intent.id);
      // Handle the event
      break;
    case "payment_intent.payment_failed":
      const failedIntent = event.data.object;
      const message =
        failedIntent.last_payment_error &&
        failedIntent.last_payment_error.message;
      console.log("Failed:", failedIntent.id, message);

      // Notify the customer of the failed payment
      // await notifyCustomerOfFailedPayment(failedIntent.id, message);
      // Optionally, log the error or take further action
      // await logPaymentError(failedIntent.id, message);

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.sendStatus(200);
});

exports.stripeWebhook = functions.https.onRequest(app);
