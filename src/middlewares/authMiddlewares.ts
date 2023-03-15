import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';



export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    next();
}


export function isCustomer(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== Role.CUSTOMER)
        return res.status(403).json({ error: "Not authorized. You must be a CUSTOMER to use this endpoint" });
    next();
}


export function isApe(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== Role.APE)
        return res.status(403).json({ error: "Not authorized. You must be an APE to use this endpoint" });
    next();
}


export function isPlanter(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== Role.PLANTER)
        return res.status(403).json({ error: "Not authorized. You must be a PLANTER to use this endpoint" });
    next();
}

