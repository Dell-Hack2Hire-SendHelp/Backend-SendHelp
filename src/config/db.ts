import { PrismaClient } from '@prisma/client';


// Singleton pattern for the PrismaClient instance. Access via DB.instance
export const DB = {
    instance: new PrismaClient(),
};
Object.freeze(DB);