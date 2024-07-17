import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { company, name, email, phone, address, message, system } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error },
      { status: 500 }
    );
  }
}
