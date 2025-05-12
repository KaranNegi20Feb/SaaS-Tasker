import { Payload } from "@prisma/client/runtime/library";
import UserServices, { CreateUserPayload, GoogleLoginPayload, UpdateUserDetailsPayloadWithEmail } from "../../services/user";

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
    },
    getUserTokenWithGoogle: async (_: any, payload: GoogleLoginPayload) => {
        const token = await UserServices.googleLogin(payload);
        return token;
      },
    getUsersOrganizations: async (_: any, { credential }: { credential: string }) => {
        return await UserServices.getOrganizations(credential);
    },
    getUserDetailsWithEmail: async (_:any,{ email }:{email:string})=>{
        return await UserServices.getUserDetailbyEmail(email);
    }
}

const mutations={
    createUser:async(_: any, payload:CreateUserPayload)=>{
        const res=await UserServices.createUser(payload);
        return res; 
    },
    googleSignup: async (_: any, payload: GoogleLoginPayload) => {
        const token = await UserServices.googleLogin(payload);
        return token;
    },
    updateUserDetails: async (_: any, payload: UpdateUserDetailsPayloadWithEmail) => {
        const updatedUser = await UserServices.updateUserDetails(payload);
        return "User updated successfully";
    }


};

export const resolvers={queries,mutations}