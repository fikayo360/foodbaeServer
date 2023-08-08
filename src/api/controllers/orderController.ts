import OrderModel from '../../models/orderModel';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import Usermodel from '../../models/userModel';

class Order {
    async createOrder(req:Request,res:Response){
        const username = req.user.username
        const {products,amount,address} = req.body
        if(products.length === 0 ){
            return res.status(StatusCodes.BAD_REQUEST).json('products cant be empty');
        }
        if(!amount || !address){
            return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty');
        }
        try{
            const neworder = await OrderModel.prototype.createOrder(username,products,amount,address)
            console.log(neworder)
            res.status(StatusCodes.OK).json("product added")
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        }
    }

    async deleteOrderById(req: Request, res: Response){
        const {id} = req.params
        try{
            const deleted = await OrderModel.prototype.deleteOrder(id)
            res.status(StatusCodes.OK).json("order deleted")
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

    async updateOrderStatus(req: Request, res: Response){
        const {id} = req.params
        try{
            const updated = await OrderModel.prototype.updateOrderStatus(id)
            res.status(StatusCodes.OK).json("order updated")
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

    async getOrderById(req: Request, res: Response){
        const {userId} = req.params
        try{
            const searchFood = await OrderModel.prototype.getOrdersById(userId)
            res.status(StatusCodes.OK).json(searchFood)
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

    async allOrders(req: Request, res: Response){
       
        try{
            let items = await OrderModel.prototype.getAllOrders()
            res.status(StatusCodes.OK).json(items)
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

}

export default Order