import { prismaClient } from "../lib/db";

export interface CreateOrganizationPayload {
  name: string;
  userIds?: string[];
}

class OrganizationServices {
  public static createOrganization(payload: CreateOrganizationPayload) {
    const { name, userIds } = payload;

    return prismaClient.organization.create({
      data: {
        name,
        users: userIds && userIds.length > 0
          ? {
              connect: userIds.map((id) => ({ id })),
            }
          : undefined,
      },
    include: {
      users: {
        select: {
          id: true,
          email: true,
        }
      }
    }
    });
  }

  public static getAllOrganizations() {
    return prismaClient.organization.findMany({
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            email: true,
          }
        }
      }
    });
  }
}

export default OrganizationServices;
