import express, { Router } from 'express';

const router:Router = express.Router()
import User from "../controllers/userController"

router.route("/signup").post(User.prototype.register)
router.route("/login").post(User.prototype.login)
// router.route("/search").post(authUser,findFriend)
router.route("/forgotPassword").post(User.prototype.forgotPassword)
router.route("/changePassword").post(User.prototype.changePassword)

module.exports = router