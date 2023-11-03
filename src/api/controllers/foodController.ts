import FoodModel from "../../models/foodModel"
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import tryCatch from '../../utils/tryCatch';

const foodModel = new FoodModel()
class Food {
     createFood = tryCatch(
        async (req:Request,res:Response) => {
            const {title,image,category,description,price} = req.body
            if(!title || !image || !category || !description || !price){
                return res.status(StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
                const newproduct = await foodModel.createFood(title,image,category,description,price)
                console.log(newproduct)
                res.status(StatusCodes.OK).json("product added")
        }
        
     ) 

     updateFood = tryCatch(
        async (req: Request, res: Response) => {
            const {id} = req.params
            const {ntitle,nimage,ncategory,ndescription,nprice} = req.body
                const updatedFood = await foodModel.updateFood(id,ntitle,nimage,ncategory,ndescription,nprice)
                res.status(StatusCodes.OK).json("Product updated")
    
        }
    
     )

     deleteFoodBYId = tryCatch(
        async (req: Request, res: Response) => {
            const {id} = req.params
                const deleted = await foodModel.deleteFood(id)
                res.status(StatusCodes.OK).json("food deleted")
        }
     )

    getFoodByName = tryCatch(
        async (req: Request, res: Response) =>{
            const {name} = req.params
           
                const searchFood = await foodModel.getFoodByTitle(name)
                if(!searchFood){
                    return res.status(StatusCodes.BAD_REQUEST).json("food not found")
                }
                res.status(StatusCodes.OK).json(searchFood)
        }
    )

     allFoods = tryCatch(
        async (req: Request, res: Response) => {
            const {foodCategory} = req.params
                let items;
                if (foodCategory){
                     items = await foodModel.getFoodByCategory(foodCategory);
                }
                else{
                     items = await foodModel.getAllFoods()
                }
                res.status(StatusCodes.OK).json(items)
        }
     )

}

export default new Food()