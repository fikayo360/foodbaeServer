import express, { Router } from 'express';
import { authUser } from '../middlewares/auth';
const router:Router = express.Router()
import Food from '../controllers/foodController';

router.route("/createFood").post(authUser,Food.prototype.createFood)
router.route("/deleteFood/:id").delete(authUser,Food.prototype.deleteFoodBYId)
router.route("/updateFood/:id").put(authUser,Food.prototype.updateFood)
router.route("/getFood").get(authUser,Food.prototype.getFoodByName)
router.route("/allFood/:foodCategory").get(Food.prototype.allFoods)
router.route("/allFood").get(Food.prototype.allFoods)
module.exports = router