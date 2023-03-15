
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findAllOrders, findOrderById, updateOrderStatus } from "../services/orderService";



export async function getAllOrders(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const status = req.query.status ? OrderStatus[req.query.status as keyof typeof OrderStatus] : undefined;
    const searchByUsername = req.query.username as string;

    const queryRes = await findAllOrders({ page, status, searchByUsername });
    res.status(200).json(queryRes);
}


export async function getOrderById(req: Request, res: Response) {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const queryRes = await findOrderById(id);
    res.status(200).json(queryRes);
}


export async function approveOrder(req: Request, res: Response) {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const queryRes = await updateOrderStatus(id, OrderStatus.APPROVED);
}