"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
router.route("/signup").post(userController_1.default.prototype.register);
router.route("/login").post(userController_1.default.prototype.login);
// router.route("/search").post(authUser,findFriend)
router.route("/forgotPassword").post(userController_1.default.prototype.forgotPassword);
router.route("/changePassword").post(userController_1.default.prototype.changePassword);
module.exports = router;
