import express, { Router } from 'express';
import { authUser } from '../middlewares/auth';
const router:Router = express.Router()
import User from "../controllers/userController"

router.route("/signup").post(User.prototype.register)
router.route("/login").post(User.prototype.login)
// router.route("/search").post(authUser,findFriend)
router.route("/forgotPassword").post(User.prototype.forgotPassword)
router.route("/changePassword").post(User.prototype.changePassword)
router.route("/updateProfilePic").post(authUser,User.prototype.updateProfile)
module.exports = router