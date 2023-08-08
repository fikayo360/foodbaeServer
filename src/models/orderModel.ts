import pool from "../db/connect"
import { v4 as uuidv4 } from 'uuid';
import Usermodel from './userModel';
interface Product {
    productId: string;
    img: string;
    quantity: number;
    price: number;
  }

  interface Order{
    id: string;
    userId: string | undefined;
    products: Product[];
    amount: number;
    address: string;
  }

class OrderModel {
    async createOrder(username:string,products:Product[],amount:number,address:string):Promise<Order | null>{
        const id = uuidv4();
        const user = await Usermodel.prototype.findUser(username)
        const userId = user?.id
        const productsJson = JSON.stringify(products);
        const query= `INSERT INTO "order" (id,user_id,products, amount, address)
        VALUES ('${id}','${userId}','${productsJson}','${amount}','${address}');`
        try{
            const result = await pool.query(query);
            console.log(`created successfully`)
                const order = {
                id,userId,products, amount, address
                };
            return order
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
     
    async deleteOrder(id:string):Promise<null>{
        const query= `DELETE FROM "order" WHERE id = '${id}';`
        try{
            const result = await pool.query(query);
            console.log(`deleted successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async updateOrderStatus(id:string):Promise<null>{
        const query= `UPDATE "order" SET status = ${true} WHERE id = '${id}';`
        try{
            const result = await pool.query(query);
            console.log(`updated successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async getOrdersById(id:string){
        const query = `SELECT * FROM "order" JOIN "user" ON user_id = '${id}';`
        try{
            const result = await pool.query(query);
            if (result.rows.length === 0) {
                return null;
                } else {
                const order = result.rows;
                return order;
            }
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async getAllOrders(){
        const query= `SELECT * FROM "order";`
        try{
            const result = await pool.query(query);
            if (result.rows.length === 0) {
                return null;
                } else {
                const order = result.rows;
                return order;
            }
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
}

        
      
            

export default OrderModel