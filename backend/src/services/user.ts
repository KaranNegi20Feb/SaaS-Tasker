import { prismaClient } from "../lib/db"
import {createHmac,randomBytes} from 'node:crypto'
import JWT from 'jsonwebtoken'

const JWT_SECRET="$KARN"

export interface CreateUserPayload{
    firstName:string
    lastName:string
    email:string
    password:string
}

export interface GetUserTokenPayload{
    email:string
    password:string
}
class UserServices{
    private static generateHash(salt: string, password:string){
        const hashedPassword=createHmac('sha256',salt).update(password).digest("hex")
        return hashedPassword
    }

    public static createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password}=payload
        const salt=randomBytes(32).toString("hex");
        const hashedPassword=UserServices.generateHash(salt,password)

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            },
        });
    }
    public static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where:{email}})
    }
    public static async getUserToken(payload:GetUserTokenPayload){
        const {email,password}=payload;
        const user=await UserServices.getUserByEmail(email)
        if(!user) throw new Error('user not found');
        const userSalt=user.salt
        const useHasedPassword=UserServices.generateHash(userSalt,password)
        if(useHasedPassword!==user.password)
        throw new Error(`Incorrect Password`)
        const token =JWT.sign({id:user.id,email:user.email},JWT_SECRET)
        return token
    }

} 
export default UserServices;