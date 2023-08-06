import pool from "../db/connect"
import { v4 as uuidv4 } from 'uuid';

interface Food{
title:string;
image:string;
category:string;
description:string;
price:number;
}

class FoodModel{
    async createFood(title:string,image:string,category:string,description:string,price:number):Promise<Food | null>{
        const id = uuidv4();
        const query= `INSERT INTO "food" (title, image, description,category, price)
        VALUES (${id},${title},${image},${description},${category},${price});`
        try{
            const result = await pool.query(query);
            console.log(`created successfully`)
             const food = {
                title,image,category,description,price
              };
            return food
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
    async updateFood(id:string,ntitle:string,nimage:string,ncategory:string,ndescription:string,nprice:number):Promise<null>{
        const query= `SET title = ${ntitle}, image = ${nimage}, category = ${ncategory}, description = ${ndescription}, price = ${nprice} WHERE id = ${id};`
        try{
            const result = await pool.query(query);
            console.log(`created successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
    async deleteFood(id:string):Promise<null>{
        const query= `DELETE FROM "food" WHERE id = ${id};`
        try{
            const result = await pool.query(query);
            console.log(`deleted successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
    async getFoodByTitle(name:string):Promise<Food|null>{
        const query= `SELECT * FROM "food" WHERE title = ${name};`
        try{
            const result = await pool.query(query);
            if (result.rows.length === 0) {
                return null;
              } else {
                const food = JSON.parse(result.rows[0].toJSON());
                return food;
            }
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async getFoodByCategory(category:string){
        const query= `SELECT * FROM "food" WHERE category = ${category};`
        try{
            const result = await pool.query(query);
            if (result.rows.length === 0) {
                return null;
              } else {
                const food = result.rows;
                return food;
            }
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async getAllFoods(){
        const query= `SELECT * FROM "food";`
        try{
            const result = await pool.query(query);
            if (result.rows.length === 0) {
                return null;
              } else {
                const food = result.rows;
                return food;
            }
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
}

export default FoodModel