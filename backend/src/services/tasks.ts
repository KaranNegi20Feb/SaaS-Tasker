import { prismaClient } from "../lib/db";

export interface CreateTaskPayload{
    title: string,
    description: string,
    userId: string,
    organizationId: string;
}

class TaskService {
    public static createTask(payload: CreateTaskPayload) {
      const { title, description, userId, organizationId } = payload;
  
      return prismaClient.task.create({
        data: {
          title,
          description,
          userId,          // optional
          organizationId,  // required
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
}

export default TaskService;