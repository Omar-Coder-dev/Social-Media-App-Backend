"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = void 0;
const generateHtml = (subject, name, code) => {
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
            text-align: center;
            line-height: 1.6;
            color: #333333;
        }
        .subject-badge {
            display: inline-block;
            background-color: #e7f3ff;
            color: #007bff;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            background-color: #f8f9fa;
            border: 1px dashed #007bff;
            padding: 15px;
            margin: 20px 0;
            display: inline-block;
            letter-spacing: 5px;
            color: #007bff;
        }
        .warning {
            color: #d9534f;
            font-size: 13px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            padding: 15px;
            background-color: #f9f9f9;
            color: #777777;
            font-size: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Saraha App</h1>
        </div>
        <div class="content">
            <div class="subject-badge">Subject: ${subject}</div>
            <div class="greeting">Hi ${name},</div>
            <p>Please use the verification code below to confirm your request:</p>
            <div class="otp-code">${code}</div>
            <p class="warning">⚠️ This code is valid for only 5 minutes.</p>
        </div>
        <div class="footer">
            &copy; 2026 Saraha App. All rights reserved.
        </div>
    </div>
</body>
</html>`;
};
exports.generateHtml = generateHtml;
//# sourceMappingURL=generateHTML.js.map