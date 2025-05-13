import { prismaClient } from "../lib/db";

class RequestService {
  public static async createRequest(name: string, userId: string, organizationId: string) {
    const existing = await prismaClient.request.findFirst({
      where: {
        userId,
        organizationId,
        status: "Pending",
      },
    });

    if (existing) {
      throw new Error("A pending request already exists for this user and organization.");
    }

    // Create new request
    return await prismaClient.request.create({
      data: {
        name,
        userId,
        organizationId,
        status: "Pending",
      },
    });
  }
  public static async getAllRequests() {
  return await prismaClient.request.findMany({
    include: {
      user: true,
      organization: true,
    },
  });
}

}

export default RequestService;
