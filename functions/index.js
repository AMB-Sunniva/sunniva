const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: functions.config().email.usertest,
    pass: functions.config().email.passtest,
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

// Send Quote Request Email
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { company, name, email, phone, address, message, system } =
        req.body;

      const mailOptions = {
        from: functions.config().email.usertest, // Use the email from config
        to: "dillon.craw@gmail.com",
        subject: "New Quote Request",
        text: `
          Company: ${company}
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Address: ${address}
          System: ${system}
          Message: ${message}
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  });
});

// Send Order Confirmation Email
exports.sendOrderConfirmation = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      // Extracting order data from the request body
      const {
        address,
        cart,
        city,
        email,
        fullName,
        phoneNumber,
        state,
        totalPrice,
        zipCode,
        paymentStatus,
      } = req.body;

      // Format the order details for the customer's email
      const customerHtmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0066cc;">Thank You for Your Order, ${fullName}!</h2>
          <p>We're excited to let you know that we've received your order and are preparing it for shipment. Here are your order details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Options</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">$${item.price}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">
                    Size: ${item.selectedOptions.selectedSize}<br/>
                    Attached: ${item.selectedOptions.attachedOrStandAlone}<br/>
                    End Board: ${item.selectedOptions.endBoardDesign}<br/>
                    Lumber Size: ${item.selectedOptions.lumberSize}<br/>
                    Stain Color: ${item.selectedOptions.stainColor}
                  </td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <p style="margin-top: 20px;"><strong>Total Price: $${totalPrice.toFixed(
            2
          )}</strong></p>
          <p>If you have any questions about your order, please feel free to contact us at <a href="mailto:office@sunnivasol.com">office@sunnivasol.com</a> or call us at <strong>970-759-5502</strong>.</p>
          <p>Thank you for choosing Sunniva Solar!</p>
        </div>
      `;

      // Format the order details for the admin email
      const adminTextContent = `
        New Order Received:
        - Name: ${fullName}
        - Email: ${email}
        - Phone: ${phoneNumber}
        - Address: ${address}, ${city}, ${state}, ${zipCode}
        - Payment Status: ${paymentStatus}
        - Order Details: 
          ${cart
            .map(
              (item) =>
                `${item.quantity}x ${item.name} @ $${
                  item.price
                } [Options: ${JSON.stringify(item.selectedOptions)}]`
            )
            .join("\n")}
        - Total Price: $${totalPrice.toFixed(2)}
      `;

      // Send email to the customer
      await transporter.sendMail({
        from: functions.config().email.usertest,
        to: email,
        subject: "Your Order Confirmation - Sunniva Solar",
        html: customerHtmlContent,
      });

      // Send email to yourself (admin)
      await transporter.sendMail({
        from: functions.config().email.usertest,
        to: "dillon.craw@gmail.com",
        subject: "New Order Received",
        text: adminTextContent,
      });

      res
        .status(200)
        .json({ message: "Order confirmation emails sent successfully" });
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
      res
        .status(500)
        .json({ message: "Error sending order confirmation email", error });
    }
  });
});

const app = express();
app.use(bodyParser.raw({ type: "application/json" }));
