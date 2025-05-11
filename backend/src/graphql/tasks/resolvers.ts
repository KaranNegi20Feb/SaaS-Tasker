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
    getTaskByCreds: async (_: any, args: { userId: string, organizationId: string }) => {
    return await TaskService.getTaskByCredentials(args);
  },
}

export const resolvers={mutation,queries}