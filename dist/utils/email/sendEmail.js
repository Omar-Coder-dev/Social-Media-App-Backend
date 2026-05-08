"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer_1.default.createTransport({
        secure: false, // use STARTTLS
        service: "gmail",
        auth: {
            user: config_1.EMAIL_USER,
            pass: config_1.EMAIL_PASSWORD,
        },
    });
    try {
        const info = await transporter.sendMail({
            from: `"Saraha App" <${config_1.EMAIL_USER}>`, // sender address
            to, // list of recipients
            subject, // subject line
            html, // HTML body
        });
        console.log("Message sent: %s", info.accepted);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    }
    catch (err) {
        console.error("Error while sending mail:", err);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map