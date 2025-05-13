import OrganizationServices, {CreateOrganizationPayload} from '../../services/organization'
 
const mutations={
    createOrganization:async(_:any, payload:CreateOrganizationPayload)=>{
        const result=await OrganizationServices.createOrganization(payload)
        return result
    },
}

const queries={
    getAllOrganizations: async () => {
        return await OrganizationServices.getAllOrganizations();
    },
    getAllUsersfromOrganization:async (_:any, {name}: {name:string})=>{
        return await OrganizationServices.getAllUsersFromOrganization(name);
    }
}
export const resolvers={mutations,queries}

