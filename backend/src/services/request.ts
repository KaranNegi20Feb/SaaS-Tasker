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

  public static async acceptRequest(requestId: string) {
  const request = await prismaClient.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new Error("Request not found.");
  }

  await prismaClient.organization.update({
    where: { id: request.organizationId },
    data: {
      users: {
        connect: { id: request.userId },
      },
    },
  });

  await prismaClient.request.delete({
    where: { id: requestId },
  });

  return "Request accepted and processed.";
}

public static async rejectRequest(requestId: string) {
  const request = await prismaClient.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new Error("Request not found.");
  }

  // Simply delete the request
  await prismaClient.request.delete({
    where: { id: requestId },
  });

  return "Request rejected and removed.";
}



}

export default RequestService;
