import jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
  }
  
  const sendEmailConfirmation = (receiver: string): void => {
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
  
    let mailOptions: MailOptions = {
      from: process.env.EMAIL as string,
      to: receiver,
      subject: 'Welcome',
      text: 'Welcome to chirp, the home of free and unfiltered news on the Go',
    };
  
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

export {sendEmailConfirmation}