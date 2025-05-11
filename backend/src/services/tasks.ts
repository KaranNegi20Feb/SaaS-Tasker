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

    public static async getTaskByCredentials(payload: { userId: string, organizationId: string }) {
        const { userId, organizationId } = payload;
        const tasks = await prismaClient.task.findMany({
            where: {
            userId,
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
}

export default TaskService;
