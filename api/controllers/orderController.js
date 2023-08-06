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
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const http_status_codes_1 = require("http-status-codes");
class Order {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const { products, amount, address, status } = req.body;
            if (!products || !amount || !address || !status) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
            try {
                const neworder = yield orderModel_1.default.prototype.createOrder(username, products, amount, address, status);
                console.log(neworder);
                res.status(http_status_codes_1.StatusCodes.OK).json("product added");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
        });
    }
    deleteOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleted = yield orderModel_1.default.prototype.deleteOrder(id);
                res.status(http_status_codes_1.StatusCodes.OK).json("order deleted");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const updated = yield orderModel_1.default.prototype.updateOrderStatus(id);
                res.status(http_status_codes_1.StatusCodes.OK).json("order updated");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    getFoodById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const searchFood = yield orderModel_1.default.prototype.getOrdersById(id);
                res.status(http_status_codes_1.StatusCodes.OK).json(searchFood);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    allOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let items = yield orderModel_1.default.prototype.getAllOrders();
                res.status(http_status_codes_1.StatusCodes.OK).json(items);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
}
exports.default = Order;
