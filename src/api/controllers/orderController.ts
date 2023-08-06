import OrderModel from '../../models/orderModel';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

class Order {
    async createOrder(req:Request,res:Response){
       const {username} = req.params
        const {products,amount,address,status} = req.body
        if(!products || !amount || !address || !status){
            return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty');
        }
        try{
            const neworder = await OrderModel.prototype.createOrder(username,products,amount,address,status)
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

    async getFoodById(req: Request, res: Response){
        const {id} = req.params
        try{
            const searchFood = await OrderModel.prototype.getOrdersById(id)
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