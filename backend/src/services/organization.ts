import { prismaClient } from "../lib/db";

export interface CreateOrganizationPayload{
    name:string,
    admin:string
}

class OrganizationServices{
    public static createOrganization(payload:CreateOrganizationPayload){
        const {name,admin}=payload;
        return prismaClient.organization.create({
            data: {
                name,
                admin
            }
        });
    }
}

export default OrganizationServices
