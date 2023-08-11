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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authUser = void 0;
const jwt_1 = require("../../utils/jwt");
const http_status_codes_1 = require("http-status-codes");
const userModel_1 = __importDefault(require("../../models/userModel"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(400).json("no token! access denied");
    }
    const tokenData = authHeader.split(" ");
    const token = tokenData[1];
    try {
        const { username, userId } = (0, jwt_1.isTokenValid)(token);
        req.user = { username, userId };
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("Token expired");
    }
});
exports.authUser = authUser;
const isAdmin = (req, res, next) => {
    authUser(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const foundUser = yield userModel_1.default.prototype.findUser(req.user.username);
        if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.isAdmin) {
            next();
        }
        else {
            return res.status(403).json("access denied");
        }
    }));
};
exports.isAdmin = isAdmin;
