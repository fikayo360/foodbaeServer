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
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("./userModel"));
class OrderModel {
    createOrder(username, products, amount, address, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const user = yield userModel_1.default.prototype.findUser(username);
            const user_id = user === null || user === void 0 ? void 0 : user.id;
            const query = `INSERT INTO "order" (id,userId,products, amount, address,status)
        VALUES (${id},${user_id},${products},${amount},${address},${status});`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`created successfully`);
                const order = {
                    id, user_id, products, amount, address, status
                };
                return order;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM "order" WHERE id = ${id};`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`deleted successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    updateOrderStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SET status = ${true} WHERE id = ${id};`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`updated successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    getOrdersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "order" WHERE id = ${id};`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const order = JSON.parse(result.rows[0].toJSON());
                    return order;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "order";`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const order = result.rows;
                    return order;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
}
exports.default = OrderModel;
