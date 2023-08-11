"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const foodController_1 = __importDefault(require("../controllers/foodController"));
router.route("/createFood").post(auth_1.authUser, foodController_1.default.prototype.createFood);
router.route("/deleteFood/:id").delete(auth_1.authUser, foodController_1.default.prototype.deleteFoodBYId);
router.route("/updateFood/:id").put(auth_1.authUser, foodController_1.default.prototype.updateFood);
router.route("/getFood").get(auth_1.authUser, foodController_1.default.prototype.getFoodByName);
router.route("/allFood/:foodCategory").get(foodController_1.default.prototype.allFoods);
router.route("/allFood").get(foodController_1.default.prototype.allFoods);
module.exports = router;
