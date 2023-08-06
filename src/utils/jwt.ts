import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface payloadData  {
  payload:user
}
interface user{
  username:string,
  userId:string
}
interface attachCookies{
  res:Response,
  user:user
}
const secretKey:string = process.env.JWT_SECRET || ''

const createJWT = ({ payload }:payloadData) => {
  const token:string = jwt.sign(payload, secretKey, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = (token: string): JwtPayload => jwt.verify(token, secretKey) as JwtPayload;

const attachCookiesToResponse = ({ res, user }:attachCookies) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
  return token
};

 export {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
