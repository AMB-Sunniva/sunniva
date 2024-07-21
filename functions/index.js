const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");
const bodyParser = require("body-parser");
const endpointSecret =
  "whsec_94e4328163494e08ae6459b5cdcd750e34f31023653511bd9983d86143a1ed94"; ////

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

// Use body-parser to parse JSON webhook payloads
app.use(bodyParser.raw({ type: "application/json" }));

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
      intent = event.data.object;
      console.log(`PaymentIntent was successful!`, intent.id);
      // Handle the event
      break;
    case "payment_method.automatically_updated":
      intent = event.data.object;
      console.log(`PaymentMethod was automatically updated!`, intent.id);
      // Handle the event
      break;
    case "payment_intent.payment_failed":
      intent = event.data.object;
      const message =
        intent.last_payment_error && intent.last_payment_error.message;
      console.log("Failed:", intent.id, message);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.sendStatus(200);
});

exports.stripeWebhook = functions.https.onRequest(app);
