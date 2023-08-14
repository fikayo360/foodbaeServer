import { Request, Response,NextFunction } from 'express';
import { isTokenValid } from "../../utils/jwt";
import { StatusCodes } from 'http-status-codes';
import Usermodel from '../../models/userModel';

interface User {
    userId: string;
    username: string;
  }
  
  interface TokenPayload {
    username: string;
    userId: string;
  }
const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json("no token! access denied");
    }
  
    const tokenData = authHeader.split(" ");
    const token = tokenData[1]; 
    try {
      const { username, userId } =  isTokenValid(token) as TokenPayload;
      req.user = { username, userId };
      next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json("Token expired");
    }
  };

  const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.user.username;
    console.log(username);
    
    try {
        const foundUser = await Usermodel.prototype.findUser(username);
        console.log(foundUser);

        if (foundUser?.isadmin) {
            next();
        } else {
            return res.status(403).json("Access denied: not an admin");
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("An error occurred");
    }
};


export  {authUser,isAdmin} 