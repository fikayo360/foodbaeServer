import express, { Router } from 'express';
import { authUser,isAdmin } from '../middlewares/auth';
const router:Router = express.Router()
import Order from '../controllers/orderController';

router.route("/createOrder").post(authUser,Order.createOrder)
router.route("/deleteOrder/:id").delete(authUser,isAdmin,Order.deleteOrderById)
router.route("/updateOrderStatus/:id").put(authUser,isAdmin,Order.updateOrderStatus)
router.route("/getOrdersByUserid/:userId").get(authUser,Order.getOrderById)
router.route("/allOrders").get(Order.allOrders)
// router.route("/updateProfilePic").post(authUser,User.prototype.updateProfile)


module.exports = router