import express, { Router } from 'express';
import { authUser } from '../middlewares/auth';
const router:Router = express.Router()
import food from '../controllers/orderController';