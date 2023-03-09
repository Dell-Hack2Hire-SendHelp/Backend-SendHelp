
import { Request, Response, NextFunction } from 'express';



export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    next();
}
