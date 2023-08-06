"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
const createJWT = ({ userId, username }) => {
    console.log({ userId, secretKey, username });
    let tokenUser = { userId, username };
    const token = jsonwebtoken_1.default.sign(tokenUser, secretKey, {
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;
};
exports.createJWT = createJWT;
const isTokenValid = (token) => jsonwebtoken_1.default.verify(token, secretKey);
exports.isTokenValid = isTokenValid;
