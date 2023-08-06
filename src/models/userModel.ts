import pool from "../db/connect"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

interface User {
    id: string;
    email:string;
    username: string;
    password:string;
    profile_pic:string | null;
    resettoken: string | null;
    isAdmin: boolean | null;
  }

class Usermodel{
  
    async findUser(username: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE username = '${username}';`;
        try {
          const result = await pool.query(query);
      
          if (result.rows.length === 0) {
            return null;
          } else {
            const user = JSON.parse(result.rows[0].toJSON());
            return user;
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      }
      
    
    async findEmail(email: string): Promise<User>{
        const query = `SELECT * FROM users WHERE username = '${email}';`;
        try{
            const result = await pool.query(query)
            if (result.rows.length === 0) {
                return  Promise.reject()
              } else {
                const user = JSON.parse(result.rows[0].toJSON());
                return user;
              }
        }
       catch(err){
        console.log(err);
        return Promise.reject(err)
       }
    }

    async createUser(username:string,email:string, password:string): Promise<User>{
        const id = uuidv4();
        const query= `INSERT INTO users (id, email, username,password, profile_pic,resettoken,isAdmmin) 
        VALUES (${id},${email},${username},${bcrypt.hashSync(password, 10)});`
        try{
            const result = await pool.query(query);
            console.log(`${username} created successfully`)
             const user = {
                id,
                email,
                username,
                password,
                profile_pic: null,
                resettoken: null,
                isAdmin:null
              };

            return user
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async updateResettoken (token:string,id:string):Promise<null>{
        const query = `UPDATE users SET resettoken = ${token} WHERE id = ${id};`;
        try{
            const result = await pool.query(query);
            console.log(`token updated successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async updateResetandPassword(newpassword:string,id:string):Promise<null>{
        const query = `UPDATE users SET resettoken = '${''}', password = '${newpassword}' WHERE id = '${id}';`;

        try{
            const result = await pool.query(query);
            console.log(`token updated successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }
}

export default Usermodel