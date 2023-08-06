"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendResetToken_1 = __importDefault(require("../../utils/sendResetToken"));
const jwt = require('jsonwebtoken');
const http_status_codes_1 = require("http-status-codes");
const validateEmail_1 = __importDefault(require("../../utils/validateEmail"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jwt_1 = require("../../utils/jwt");
const createTokenUser_1 = __importDefault(require("../../utils/createTokenUser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password } = req.body;
            if (!username || !email || !password) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
            if ((0, validateEmail_1.default)(email) === false) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('invalid mail');
            }
            const userExists = yield userModel_1.default.prototype.findUser(username);
            const emailExists = yield userModel_1.default.prototype.findEmail(email);
            if (userExists || emailExists) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('user already exists');
            }
            try {
                const savedUser = yield userModel_1.default.prototype.createUser(username, email, password);
                const tokenUser = (0, createTokenUser_1.default)(savedUser);
                const cookie = (0, jwt_1.createJWT)(tokenUser);
                console.log(cookie);
                res.status(http_status_codes_1.StatusCodes.OK).json({ cookie, savedUser });
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('err creating user');
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(500).json("pls ensure fields are not empty ");
            }
            try {
                const foundUser = yield userModel_1.default.prototype.findUser(username);
                console.log(foundUser);
                if (!foundUser) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('that user does not exist');
                }
                if (!bcrypt_1.default.compareSync(password, foundUser.password)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong password');
                }
                const { password: foundUserPassword } = foundUser, others = __rest(foundUser, ["password"]);
                const tokenUser = (0, createTokenUser_1.default)(others);
                const cookie = (0, jwt_1.createJWT)(tokenUser);
                return res.status(http_status_codes_1.StatusCodes.OK).json({ user: others, cookie });
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error Authenticating user');
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const sessionUser = yield userModel_1.default.prototype.findEmail(email);
            if (!sessionUser) {
                return res.status(404).json('that user does not exist');
            }
            try {
                let reset = (0, sendResetToken_1.default)(sessionUser.email);
                sessionUser.resettoken = reset;
                yield userModel_1.default.prototype.updateResettoken(reset, sessionUser.id);
                console.log(sessionUser);
                res.status(200).json('Reset token sent successfully');
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('oops an error occured');
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, email, newPassword } = req.body;
            const sessionUser = yield userModel_1.default.prototype.findEmail(email);
            try {
                const { email } = jwt.verify(token, process.env.JWT_SECRET);
                console.log(email);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                if (email === sessionUser.email) {
                    const updated = yield userModel_1.default.prototype.updateResetandPassword(hashedPassword, sessionUser.id);
                    res.status(http_status_codes_1.StatusCodes.OK).json('password updated successfully');
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong user');
                }
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('an error occurred');
            }
        });
    }
}
exports.default = User;
