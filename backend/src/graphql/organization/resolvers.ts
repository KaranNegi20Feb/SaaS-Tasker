import OrganizationServices, {CreateOrganizationPayload} from '../../services/organization'
 
const mutations={
    createOrganization:async(_:any, payload:CreateOrganizationPayload)=>{
        const result=await OrganizationServices.createOrganization(payload)
        return result.name
    }
}
export const resolvers={mutations}

