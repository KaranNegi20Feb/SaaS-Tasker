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

  // 👥 Get All Users
  public static async getAllUsers() {
    return prismaClient.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
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
}

export default UserServices;
