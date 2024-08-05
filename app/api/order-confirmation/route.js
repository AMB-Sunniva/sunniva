import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // Parse the request body
    const {
      address,
      cart,
      city,
      createdAt,
      email,
      fullName,
      paymentStatus,
      phoneNumber,
      state,
      totalPrice,
      zipCode,
    } = await request.json();

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for the customer
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

    const adminTextContent = `
      New Order Received:
      - Name: ${fullName}
      - Email: ${email}
      - Phone: ${phoneNumber}
      - Address: ${address}, ${city}, ${state}, ${zipCode}
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
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Order Confirmation - Sunniva Solar",
      html: customerHtmlContent,
    });

    // Send email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "dillon.craw@gmail.com",
      subject: "New Order Received",
      text: adminTextContent,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error },
      { status: 500 }
    );
  }
}
