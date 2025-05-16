import { prismaClient } from "../lib/db";

export interface CreateTaskPayload {
    title: string;
    description: string;
    userId?: string;          // userId is optional
    organizationId: string;
    status:string;
}

class TaskService {
    public static createTask(payload: CreateTaskPayload) {
        const { title, description, userId, organizationId,status } = payload;

        return prismaClient.task.create({
            data: {
                title,
                description,
                userId,
                organizationId,
                status
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                organization: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    public static async getTaskByCredentials({organizationId}: { organizationId: string }) {
        const tasks = await prismaClient.task.findMany({
            where: {
            organizationId
            }
        });
        return tasks;
    }

    public static async deleteTaskById({taskId}:{taskId:string}){
        await prismaClient.task.delete({
            where:{id:taskId}
        })
        return "Task Deleted Successfully"
    }

    public static async editTaskById({taskId,title,description,status}:{taskId:string,title:string,description:string,status:string}){
        await prismaClient.task.update({
            where:{id:taskId},
            data: {
                title,
                description,
                status,
            }
        })
        return "Edited task successfully"
    }


    public static getAllTasks() {
        return prismaClient.task.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                organization: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    public static async getAllTasksByUserId(userId: string){
        return await prismaClient.task.findMany({
            where:{userId}
        })
    }
}

export default TaskService;
