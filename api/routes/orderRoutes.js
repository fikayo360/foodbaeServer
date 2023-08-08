"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const orderController_1 = __importDefault(require("../controllers/orderController"));
router.route("/createOrder").post(auth_1.authUser, orderController_1.default.prototype.createOrder);
router.route("/deleteOrder/:id").delete(auth_1.authUser, orderController_1.default.prototype.deleteOrderById);
router.route("/updateOrderStatus/:id").put(auth_1.authUser, orderController_1.default.prototype.updateOrderStatus);
router.route("/getOrdersByUserid/:userId").get(auth_1.authUser, orderController_1.default.prototype.getOrderById);
router.route("/allOrders").get(orderController_1.default.prototype.allOrders);
// router.route("/updateProfilePic").post(authUser,User.prototype.updateProfile)
module.exports = router;
