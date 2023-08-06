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
const connect_1 = __importDefault(require("../db/connect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class Usermodel {
    findUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "user" WHERE username = '${username}';`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const user = result.rows[0];
                    return user;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "user" WHERE username = '${email}';`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const user = result.rows[0];
                    return user;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            const query = `
        INSERT INTO "user" (id, email, username, password) 
        VALUES ($1, $2, $3, $4);
      `;
            const values = [id, email, username, hashedPassword];
            try {
                const result = yield connect_1.default.query(query, values);
                console.log(`${username} created successfully`);
                const user = {
                    id,
                    email,
                    username,
                    password,
                    profile_pic: null,
                    resettoken: null,
                    isAdmin: null
                };
                return user;
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        });
    }
    updateResettoken(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE "user" SET resettoken = ${token} WHERE id = ${id};`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`token updated successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    updateResetandPassword(newpassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE "user" SET resettoken = '${''}', password = '${newpassword}' WHERE id = '${id}';`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`token updated successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
}
exports.default = Usermodel;
