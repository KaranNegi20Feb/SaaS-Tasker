import TaskService,{CreateTaskPayload} from "../../services/tasks"
const mutation={
    createTask:async(_:any,payload:CreateTaskPayload)=>{
        const result=await TaskService.createTask(payload)
        return result
    }
}

const queries={
    getAllTasks: async () => {
        return await TaskService.getAllTasks();
    },
    getTaskByCreds: async (_: any, {organizationId}: { organizationId: string }) => {
    return await TaskService.getTaskByCredentials({organizationId});
  },
  getAllTasksById: async (_:any,{userId}:{userId:string})=>{
    return await TaskService.getAllTasksByUserId(userId)
  }
}

export const resolvers={mutation,queries}