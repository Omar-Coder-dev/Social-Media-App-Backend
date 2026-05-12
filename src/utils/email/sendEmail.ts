import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD, EMAIL_USER } from '../../config'

export const sendEmail = async ({ to, otp, subject, html }: { to: string, otp: string, subject: string, html: string }) => {
    const transporter = nodemailer.createTransport({
        secure: false, // use STARTTLS
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Saraha App" <${EMAIL_USER}>`, // sender address
            to, // list of recipients
            subject, // subject line
            html, // HTML body
        });

        console.log("Message sent: %s", info.accepted);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}