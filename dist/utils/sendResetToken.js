"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer = __importStar(require("nodemailer"));
function generateToken(email, expiresIn) {
    const secretKey = process.env.JWT_SECRET || 'secretkey';
    const payload = { email };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
    return token;
}
function sendResetToken(email) {
    const lifetime = Number(process.env.JWT_LIFETIME);
    let tokenData = generateToken(email, lifetime);
    //const emailExists = await Usermodel.prototype.findEmail(email)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'password reset',
        text: `Please copy this token and use it to reset your password: ${tokenData}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
    return tokenData;
}
exports.default = sendResetToken;
