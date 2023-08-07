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
        const query = `SELECT * FROM "user" WHERE username = '${username}';`;
        try {
          const result = await pool.query(query);
      
          if (result.rows.length === 0) {
            return null;
          } else {
            const user = result.rows[0];
            return user;
          }
        } catch (err) {
          console.log(err);
          return Promise.reject(err)
        }
      }
      
    
    async findEmail(email: string): Promise<User | null>{
        const query = `SELECT * FROM "user" WHERE email = '${email}';`;
        try{
            const result = await pool.query(query)
            if (result.rows.length === 0) {
                return null
              } else {
                const user = result.rows[0];
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
      const hashedPassword = bcrypt.hashSync(password, 10);
      const query = `
        INSERT INTO "user" (id, email, username, password) 
        VALUES ($1, $2, $3, $4);
      `;
      const values = [id, email, username, hashedPassword];
        try{
          const result = await pool.query(query, values);
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
        }catch(error){
            console.log(error);
            return Promise.reject(error)
        }
    }

    async updateResettoken (token:string,id:string):Promise<null>{
      const query = `UPDATE "user" SET resettoken = $1 WHERE id = $2;`;
      const values = [token, id];
        try{
            const result = await pool.query(query,values);
            console.log(`token updated successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async updateResetandPassword(newpassword:string,id:string):Promise<null>{
        const query = `UPDATE "user" SET resettoken = '${null}', password = '${newpassword}' WHERE id = '${id}';`;

        try{
            const result = await pool.query(query);
            console.log(`token updated successfully`)
            return null
        }catch(err){
            console.log(err);
            return Promise.reject(err)
        }
    }

    async profileUpdate(newProfilePic:string,id:string){
      const query = `UPDATE "user" SET profile_pic = '${newProfilePic}' WHERE id = '${id}';`;
      try{
        const result = await pool.query(query);
        console.log(`picture updated successfully`)
        return null
      }catch(err){
        console.log(err);
        return Promise.reject(err)
      }
    }
}

export default Usermodel