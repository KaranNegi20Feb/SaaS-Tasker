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
