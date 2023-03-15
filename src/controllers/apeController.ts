
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findAllOrders } from "../services/orderService";



export async function getAllOrders(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const status = req.query.status ? OrderStatus[req.query.status as keyof typeof OrderStatus] : undefined;
    const searchByUsername = req.query.username as string;

    const queryRes = await findAllOrders({ page, status, searchByUsername });
    res.status(200).json(queryRes);
}