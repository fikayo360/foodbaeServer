import { number } from 'joi';
import jwt, { Secret } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import Usermodel from '../models/userModel';

interface JwtPayload {
    email: string
  }

function generateToken(email: string, expiresIn: number): string {
    const secretKey: Secret = process.env.JWT_SECRET || 'secretkey';
    const payload: JwtPayload = { email };
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  }

 function sendResetToken(email: string) {   
    const lifetime = Number(process.env.JWT_LIFETIME)
    let tokenData = generateToken(email, lifetime);
    //const emailExists = await Usermodel.prototype.findEmail(email)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
  
    let mailOptions = {
      from: process.env.EMAIL as string,
      to: email,
      subject: 'password reset',
      text: `Please copy this token and use it to reset your password: ${tokenData}`,
    };
  
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
    return tokenData;
  }
  

export default sendResetToken