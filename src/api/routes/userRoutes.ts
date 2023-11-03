import express, { Router } from 'express';
import { authUser } from '../middlewares/auth';
const router:Router = express.Router()
import User from "../controllers/userController"
const rateLimiter = require('express-rate-limit')

const LoginLimiter = rateLimiter({
    windowMs:60 * 1000,
    max:10,
    message:'pls try again later '
})

const signupLimiter = rateLimiter({
    windowMs:60 * 1000,
    max:10,
    message:'Too many accounts created from this IP, please try again after an hour"'
})

router.route("/signup").post(signupLimiter(),User.register)
router.route("/login").post(LoginLimiter(),User.login)
router.route("/forgotPassword").post(User.forgotPassword)
router.route("/changePassword").post(User.changePassword)
router.route("/updateProfilePic").post(authUser,User.updateProfile)

module.exports = router