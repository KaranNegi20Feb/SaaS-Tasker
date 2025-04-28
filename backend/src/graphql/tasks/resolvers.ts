import TaskService,{CreateTaskPayload} from "../../services/tasks"
const mutation={
    createTask:async(_:any,payload:CreateTaskPayload)=>{
        const result=await TaskService.createTask(payload)
        return result
    }
}

const queries={

}

export const resolvers={mutation,queries}