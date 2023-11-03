import express, { Router } from 'express';
import { authUser,isAdmin } from '../middlewares/auth';
const router:Router = express.Router()
import Food from '../controllers/foodController';

router.route("/createFood").post(authUser,isAdmin,Food.createFood)
router.route("/deleteFood/:id").delete(authUser,isAdmin,Food.deleteFoodBYId)
router.route("/updateFood/:id").put(authUser,isAdmin,Food.updateFood)
router.route("/getFood/:name").get(authUser,Food.getFoodByName)
router.route("/allFood/:foodCategory").get(Food.allFoods)
router.route("/allFood").get(Food.allFoods)

module.exports = router