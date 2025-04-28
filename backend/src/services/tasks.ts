import { prismaClient } from "../lib/db";

export interface CreateTaskPayload {
    title: string;
    description: string;
    userId?: string;          // userId is optional
    organizationId: string;
}

class TaskService {
    public static createTask(payload: CreateTaskPayload) {
        const { title, description, userId, organizationId } = payload;

        return prismaClient.task.create({
            data: {
                title,
                description,
                userId,
                organizationId,
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
