import crypto from "crypto";

import { Role } from "@prisma/client";
import { DB } from "./db";

const db = DB.instance;



export async function findUserByUsername(username: string) {
    return await db.appUser.findUnique({
        where: { 
            username
        }
    });
}



export async function registerNewUser(
    email: string,
    username: string,
    password: string,
    fullname: string,
    role: Role
) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');

    await db.appUser.create({
        data: {
            fullname: fullname,
            role: role,
            email: email,
            username: username,
            password: passwordHash,
            passwordSalt: salt,
        }
    });

    console.log(`User ${username} created successfully at ${new Date().toLocaleString()}`);
}