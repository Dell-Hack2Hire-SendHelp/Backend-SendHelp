
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findAllOrders, findOrderById, updateOrder } from "../services/orderService";



export async function getAllOrders(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const status = req.query.status ? OrderStatus[req.query.status as keyof typeof OrderStatus] : undefined;
    const searchByUsername = req.query.username as string;

    const queryRes = await findAllOrders({ page, status, searchByUsername });
    res.status(200).json(queryRes);
}


export async function getOrderById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const order = await findOrderById(id);
    res.status(200).json(order);
}


export async function updateOrderStatus(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const status = OrderStatus[req.body.status as keyof typeof OrderStatus];

    const order = await updateOrder(id, { status });
    res.status(200).json({ message: "Order status updated successfully", order });
}