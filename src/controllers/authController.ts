
import { Request, Response } from "express";
import { AppUser, Role } from "@prisma/client";
import { registerNewUser } from "../services/authService";



// To remove the password properties from the user object so to not expose it to the client
function removeUserCredentials(user: AppUser) {
    return {
        id: user.id,
        username: user.username,
        role: user.role,
        fullname: user.fullname,
        email: user.email,
    }
}






export function getStatus(req: Request, res: Response) {
    if (!req.user) 
        return res.status(401).json({ error: "Not logged in" });

    res.status(200).json(removeUserCredentials(req.user as AppUser));
}


export async function signUp(req: Request, res: Response) {
    const { email, username, password, fullname, role } = req.body;
    await registerNewUser(email, username, password, fullname, role as Role);
    res.status(201).json({ message: "User created successfully. Please login." });
}


export function logOut(req: Request, res: Response) {
    req.logout((err: Error)=> {
        if (err) 
            return res.status(500).json({ error: `Error logging out: ${err.message}` });

        res.status(200).json({ message: "Logged out successfully." });
    });
}


export function onFailedLogin(req: Request, res: Response) {
    res.status(401);
    res.json({ error: "Invalid username or password" });
}

export function onSuccessLogin(req: Request, res: Response) {
    // console.log(req.user);
    res.status(200).json({
        message: "Logged in successfully",
        // user: removeUserCredentials(req.user as AppUser),
    });
}