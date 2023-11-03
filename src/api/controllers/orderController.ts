import OrderModel from '../../models/orderModel';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import tryCatch from '../../utils/tryCatch';
const orderModel = new OrderModel();

class Order {
     createOrder = tryCatch(
       async (req:Request,res:Response) =>{
            const username = req.user.username
            const {products,amount,address} = req.body
            if(products.length === 0 ){
                return res.status(StatusCodes.BAD_REQUEST).json('products cant be empty');
            }
            if(!amount || !address){
                return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
          
                const neworder = await orderModel.createOrder(username,products,amount,address)
                console.log(neworder)
                res.status(StatusCodes.OK).json(neworder)
        }
     )

    deleteOrderById = tryCatch(
        async(req: Request, res: Response) => {
            const {id} = req.params
          
                const deleted = await orderModel.deleteOrder(id)
                res.status(StatusCodes.OK).json("order deleted")
        }
    )

    updateOrderStatus = tryCatch(
        async(req: Request, res: Response) =>{
            const {id} = req.params
                const updated = await orderModel.updateOrderStatus(id)
                res.status(StatusCodes.OK).json("order updated")
        }
    )

     getOrderById = tryCatch(
        async (req: Request, res: Response) => {
            const {userId} = req.params
                const searchFood = await orderModel.getOrdersById(userId)
                res.status(StatusCodes.OK).json(searchFood)
        }
     )

     allOrders = tryCatch(
        async (req: Request, res: Response) =>{
            let items = await orderModel.getAllOrders()
            res.status(StatusCodes.OK).json(items)
    }
     )

}

export default new Order()