import { Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface payloadData  {
  payload:user
}
interface user{
  username:string,
  userId:string
}

const secretKey: Secret = process.env.JWT_SECRET || 'defaultSecretKey';

const createJWT = ({userId,username}:user) => {
  console.log({userId,secretKey,username});
  let tokenUser = {userId,username}
  const token: string = jwt.sign(tokenUser, secretKey, {
    expiresIn: process.env.JWT_LIFETIME
  });
  return token;
};

const isTokenValid = (token: string) => jwt.verify(token, secretKey) as JwtPayload;

 export {
  createJWT,
  isTokenValid
};
