
import { registerNewUser, findUserByUsername } from "../services/authService";
import { Role } from "@prisma/client";


export async function initializeDefaultUser() {
    console.log("Initializing default users...");

    const customer1 = await findUserByUsername("customer1");
    const ape1 = await findUserByUsername("ape1");
    const sukau1 = await findUserByUsername("sukau1");

    if (!customer1) 
        await registerNewUser("customer1@gmail.com", "customer1", "customer1", "Customer 1", Role.CUSTOMER);
    if (!ape1)
        await registerNewUser("ape1@gmail.com", "ape1", "ape1", "Ape 1", Role.APE);
    if (!sukau1)
        await registerNewUser("sukau1@gmail.com", "sukau1", "sukau1", "Sukau 1", Role.PLANTER);

    console.log("Default users initialized successfully.");
}