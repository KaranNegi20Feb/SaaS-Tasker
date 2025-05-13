import { prismaClient } from "../lib/db";

export interface CreateOrganizationPayload {
  name: string;
  adminId: string; // Admin ID should be passed explicitly
  userIds?: string[]; // Other users to connect
}

class OrganizationServices {
  public static createOrganization(payload: CreateOrganizationPayload) {
    const { name, adminId, userIds } = payload;

    // Create the organization and connect the users
    return prismaClient.organization.create({
      data: {
        name,
        admin: {
          connect: {
            id: adminId, // Connect the admin user
          },
        },
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

  public static async getAllUsersFromOrganization(name: string) {
    const allUsers = await prismaClient.organization.findFirst({
      where: { name },
      include: {
        users: true, // Include users related to the organization
      }
    });
    return allUsers?.users;
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
