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
    }
}
export const resolvers={mutations,queries}

