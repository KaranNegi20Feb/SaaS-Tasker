import { Payload } from "@prisma/client/runtime/library";
import UserServices, { CreateUserPayload } from "../../services/user";

const queries={
    getUserToken:async(_:any,payload:{email:string, password:string})=>{
        const token=await UserServices.getUserToken({
            email:payload.email,
            password:payload.password
        })
        return token
    },
    getAllUsers: async () => {
        return await UserServices.getAllUsers();
    }
}

const mutations={
    createUser:async(_: any, payload:CreateUserPayload)=>{
        const res=await UserServices.createUser(payload);
        return res.id; 
    }
};

export const resolvers={queries,mutations}