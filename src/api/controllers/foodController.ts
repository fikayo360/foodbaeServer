import FoodModel from "../../models/foodModel"
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

const foodModel = new FoodModel()
class Food {
    async createFood(req:Request,res:Response){
        const {title,image,category,description,price} = req.body
        if(!title || !image || !category || !description || !price){
            return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty');
        }
        try{
            const newproduct = await foodModel.createFood(title,image,category,description,price)
            console.log(newproduct)
            res.status(StatusCodes.OK).json("product added")
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        }
    }
    
    async updateFood(req: Request, res: Response){
        const {id} = req.params
        const {ntitle,nimage,ncategory,ndescription,nprice} = req.body
        try{
            const updatedFood = await foodModel.updateFood(id,ntitle,nimage,ncategory,ndescription,nprice)
            res.status(StatusCodes.OK).json("Product updated")
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }

    }

    async deleteFoodBYId(req: Request, res: Response){
        const {id} = req.params
        try{
            const deleted = await foodModel.deleteFood(id)
            res.status(StatusCodes.OK).json("food deleted")
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

    async getFoodByName(req: Request, res: Response){
        const {name} = req.params
        try{
            const searchFood = await foodModel.getFoodByTitle(name)
            if(!searchFood){
                return res.status(StatusCodes.BAD_REQUEST).json("food not found")
            }
            res.status(StatusCodes.OK).json(searchFood)
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

    async allFoods(req: Request, res: Response){
        const {foodCategory} = req.params
        try{
            let items;
            if (foodCategory){
                 items = await foodModel.getFoodByCategory(foodCategory);
            }
            else{
                 items = await foodModel.getAllFoods()
            }
            res.status(StatusCodes.OK).json(items)
        }
        catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("error occured")
        }
    }

}

export default Food