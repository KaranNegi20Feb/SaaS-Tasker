import { prismaClient } from "../lib/db";

export interface CreateOrganizationPayload{
    name:string,
}

class OrganizationServices{
    public static createOrganization(payload:CreateOrganizationPayload){
        const {name}=payload;
        return prismaClient.organization.create({
            data: {
                name,
            }
        });
    }
    public static getAllOrganizations(){
        return prismaClient.organization.findMany({
            select:{
                name:true,
            }
        })
    }
}

export default OrganizationServices
