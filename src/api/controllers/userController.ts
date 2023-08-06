import sendResetToken from '../../utils/sendResetToken';
const {sendEmailConfirmation} = require('../utils/sendEmail')
const jwt = require('jsonwebtoken');
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import validateEmail from '../../utils/validateEmail';
import Usermodel from '../../models/userModel';
import { attachCookiesToResponse } from '../../utils/jwt';
import createTokenUser from '../../utils/createTokenUser';
import bcrypt from 'bcrypt'

class User {
    async register(req: Request, res: Response){
      
        const {email,username,password} = req.body
        if (!username || !email || !password){
        res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty')
      }
        if(validateEmail(email) === false){
          res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
      }
        const userExists = await Usermodel.prototype.findUser(username)
        const emailExists = await Usermodel.prototype.findEmail(email)

        if(userExists || emailExists){
          return res.status(StatusCodes.BAD_REQUEST).json('user already exists')
        }

        try{
          const savedUser = await Usermodel.prototype.createUser(username,email,password)
          const tokenUser = createTokenUser(savedUser)
          attachCookiesToResponse({res,user:tokenUser})
          res.status(StatusCodes.OK).json({user:tokenUser})
          sendEmailConfirmation(savedUser.email)
        }catch(err){
          return res.status(StatusCodes.BAD_REQUEST).json('err creating user')
        }
        
      }

     async login(req: Request, res: Response){
      const {username,password} = req.body
      if (!username || !password){
          return res.status(500).json("pls ensure fields are not empty ")
        }
        try{  
          const foundUser = await Usermodel.prototype.findUser(username)
          console.log(foundUser);
          if(!foundUser){
              return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
          }
          
          if(!bcrypt.compareSync(password,foundUser.password)){
             return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
           }
           const { password: foundUserPassword, ...others } = foundUser;
           const tokenUser = createTokenUser(others);
           let cookie = attachCookiesToResponse({ res, user: tokenUser });
           return res.status(StatusCodes.OK).json({ user: others,cookie });
          }
          catch(err){
              return res.status(StatusCodes.BAD_REQUEST).json('error Authenticating user')
          }
     }

     async forgotPassword(req: Request, res: Response){
      const {email} = req.body
      const sessionUser = await Usermodel.prototype.findEmail(email)

      if (!sessionUser){
          return res.status(404).json('that user does not exist')
      }
      try{
              let reset = sendResetToken(sessionUser.email)
              sessionUser.resettoken = reset
              await Usermodel.prototype.updateResettoken(reset,sessionUser.id)
              console.log(sessionUser)
              res.status(200).json('Reset token sent successfully')
      }
      catch(err){
          return res.status(StatusCodes.BAD_REQUEST).json('oops an error occured')
      }
     }

     async changePassword(req: Request, res: Response){
      const {token,email,newPassword} = req.body
      const sessionUser = await Usermodel.prototype.findEmail(email)
        try{
          const { email } = jwt.verify(token,process.env.JWT_SECRET);
          console.log(email);
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          if(email === sessionUser.email){
              await Usermodel.prototype.updateResetandPassword(newPassword,sessionUser.id)
              res.status(StatusCodes.OK).json('password updated successfully');
          }
          else{
              return res.status(StatusCodes.BAD_REQUEST).json('wrong user');
          }
          }
        
          catch(err){
              return res.status(StatusCodes.BAD_REQUEST).json('an error occurred')
          }
     }
    
}

export default User