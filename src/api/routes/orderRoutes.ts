import express, { Router } from 'express';
import { authUser } from '../middlewares/auth';
const router:Router = express.Router()
import Order from '../controllers/orderController';

router.route("/createOrder").post(authUser,Order.prototype.createOrder)
router.route("/deleteOrder/:id").delete(authUser,Order.prototype.deleteOrderById)
router.route("/updateOrderStatus/:id").put(authUser,Order.prototype.updateOrderStatus)
router.route("/getOrdersByUserid/:userId").get(authUser,Order.prototype.getOrderById)
router.route("/allOrders").get(Order.prototype.allOrders)
// router.route("/updateProfilePic").post(authUser,User.prototype.updateProfile)


module.exports = router