import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";



import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

// Then you can access the variables like this:
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const JWT_SECRET = "$KARN";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface UpdateUserDetailsPayloadWithEmail{
    email: string;             
    bio: string;
    skills: [];
    githubUsername: string;
    avatar: string;
    githubUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  credential: string; // The ID Token returned by Google
}

class UserServices {
  // 🔒 Hash Generator
  private static generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  // ➕ Create User
  public static async createUser(payload: CreateUserPayload) {
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.generateHash(salt, payload.password);

    const user= await prismaClient.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        salt,
        password: hashedPassword,
      },
    });

    return JWT.sign({id: user.id, email: user.email},JWT_SECRET);

  }

  // 🔎 Get User by Email
  public static async getUserByEmail(email: string | null | undefined) {
    if (!email) throw new Error("Invalid email provided");
    return prismaClient.user.findUnique({ where: { email } });
  }

  // 🔑 Get User Token (Login with email/password)
  public static async getUserToken(payload: GetUserTokenPayload) {
    const user = await this.getUserByEmail(payload.email);
    if (!user) throw new Error("User not found");

    const hashedPassword = this.generateHash(user.salt!, payload.password);
    if (hashedPassword !== user.password) {
      throw new Error("Incorrect password");
    }

    return JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
  }

  public static async getOrganizations(credential: string) {
    if (!credential) {
      throw new Error("Token is required");
    }

    let decoded;
    try {
      // Verify and decode the token
      decoded = JWT.verify(credential, JWT_SECRET) as { email: string };
    } catch (err) {
      throw new Error("Invalid or expired token");
    }

    const email = decoded.email;
    if (!email) {
      throw new Error("Token does not contain a valid email");
    }

    // Fetch user and related organizations
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: {
        organizations: true, // Fetch related organizations
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.organizations; // Return the organizations related to the user
  }
 
  // 👥 Get All Users
  public static async getAllUsers() {
    return prismaClient.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true ,bio:true, skills:true,githubUsername:true,avatar:true,githubUrl:true,twitterUrl:true,linkedinUrl:true },
    });
  }

  // 🔐 Google Login
  public static async googleLogin(payload: GoogleLoginPayload) {
    const ticket = await client.verifyIdToken({
      idToken: payload.credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payloadData = ticket.getPayload();
    if (!payloadData || !payloadData.email) {
      throw new Error("Google login failed: invalid payload");
    }

    // Check if user exists
    let user = await this.getUserByEmail(payloadData.email);
    if (!user) {
      // If not, create a new user with placeholder password and salt
      user = await prismaClient.user.create({
        data: {
          email: payloadData.email,
          firstName: payloadData.given_name || "Google",
          lastName: payloadData.family_name || "User",
          salt: "google-oauth", // just a dummy salt
          password: "google-oauth", // not used, just required if DB schema has NOT NULL
        },
      });
    }

    return JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
  }

  public static async getUserDetailbyEmail(email:string){
    return prismaClient.user.findUnique({
      where: {email},
      select: { id: true, firstName: true, lastName: true, email: true ,bio:true, skills:true, githubUsername:true, avatar:true, githubUrl:true, twitterUrl:true, linkedinUrl:true },
    });
  }

  public static async updateUserDetails(payload: UpdateUserDetailsPayloadWithEmail) {
  return await prismaClient.user.update({
    where: { email: payload.email },
    data: {
      bio: payload.bio,
      skills: payload.skills,
      githubUsername: payload.githubUsername,
      avatar: payload.avatar,
      githubUrl: payload.githubUrl,
      twitterUrl: payload.twitterUrl,
      linkedinUrl: payload.linkedinUrl,
    }
  });
}




}

export default UserServices;
