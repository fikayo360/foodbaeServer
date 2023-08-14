import express, { Router } from 'express';
import { authUser,isAdmin } from '../middlewares/auth';
const router:Router = express.Router()
import Food from '../controllers/foodController';

router.route("/createFood").post(authUser,isAdmin,Food.prototype.createFood)
router.route("/deleteFood/:id").delete(authUser,isAdmin,Food.prototype.deleteFoodBYId)
router.route("/updateFood/:id").put(authUser,isAdmin,Food.prototype.updateFood)
router.route("/getFood").get(authUser,Food.prototype.getFoodByName)
router.route("/allFood/:foodCategory").get(Food.prototype.allFoods)
router.route("/allFood").get(Food.prototype.allFoods)
module.exports = router