import sendResetToken from '../../utils/sendResetToken';
import { sendEmailConfirmation } from '../../utils/sendEmail';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import validateEmail from '../../utils/validateEmail';
import Usermodel from '../../models/userModel';
import { createJWT } from '../../utils/jwt';
import createTokenUser from '../../utils/createTokenUser';
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';


const userModel = new Usermodel()

class User {  
    async register(req: Request, res: Response){
     
        const {email,username,password} = req.body
        if (!username || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty')
      }
        if(validateEmail(email) === false){
          return res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
      }
        const userExists = await userModel.findUser(username)
        const emailExists = await userModel.findEmail(email)

        if(userExists || emailExists){
          return res.status(StatusCodes.BAD_REQUEST).json('user already exists')
        } 

        try{
          const savedUser = await userModel.createUser(username,email,password)
          const tokenUser = createTokenUser(savedUser)
          const cookie = createJWT(tokenUser)
          console.log(cookie);
          return res.status(StatusCodes.OK).json({cookie,savedUser});
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
          const foundUser = await userModel.findUser(username)
          console.log(foundUser);
          if(!foundUser){
              return res.status(StatusCodes.BAD_REQUEST).json('that user does not exist')
          }
          
          if(!bcrypt.compareSync(password,foundUser.password)){
             return res.status(StatusCodes.BAD_REQUEST).json('wrong password')
           }
           const { password: foundUserPassword, ...others } = foundUser;
           const tokenUser = createTokenUser(others);
           const cookie = createJWT(tokenUser)
           return res.status(StatusCodes.OK).json({ user: others,cookie });
          }
          catch(err){
              return res.status(StatusCodes.BAD_REQUEST).json('error Authenticating user')
          }
     }

     async forgotPassword(req: Request, res: Response){
     
      const {email} = req.body
      const sessionUser = await userModel.findEmail(email)
      console.log(sessionUser);
      if(validateEmail(email) === false){
        return res.status(StatusCodes.BAD_REQUEST).json('invalid mail')
    }
      if (!sessionUser){
          return res.status(404).json('that user does not exist')
      }
      try{
      let reset = sendResetToken(sessionUser.email)
      const updateToken = await userModel.updateResettoken(reset,sessionUser.id)
      return res.status(200).json(` Reset token sent successfully`)
      }
      catch(err){
          return res.status(StatusCodes.BAD_REQUEST).json('oops an error occured')
      }
     }

     async changePassword(req: Request, res: Response){
     
      const {token,email,newPassword} = req.body
      const secretKey: Secret = process.env.JWT_SECRET || 'defaultSecretKey';
      const sessionUser = await userModel.findEmail(email)
        try{
          const decoded = jwt.verify(token,secretKey) as JwtPayload;
          console.log(decoded);
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          if(decoded.email === sessionUser?.email){
              const updated = await userModel.updateResetandPassword(hashedPassword,sessionUser!.id)
              return res.status(StatusCodes.OK).json('password updated successfully');
          }
          else{
              return res.status(StatusCodes.BAD_REQUEST).json('wrong user');
          }
          }
          catch(err){
              return res.status(StatusCodes.BAD_REQUEST).json('an error occurred')
          }
     }

    async updateProfile(req: Request, res: Response){
     
      const {newProfilePic} = req.body
      const username = req.user.username
      const id = req.user.userId
      
      try{
        const userExists = await userModel.findUser(username)
        const updatepicture = await userModel.profileUpdate(newProfilePic,id)
        return res.status(StatusCodes.OK).json(`profile updated successfully`)
      }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json('an error occurred')
      }
    }
}

export default User