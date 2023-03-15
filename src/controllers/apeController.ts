
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findAllOrders, findOrderById, updateOrder } from "../services/orderService";
import { sendStatusEmail } from "../services/mailService";



export async function getAllOrders(req: Request, res: Response) {
    const orders = await findAllOrders();
    res.status(200).json(orders);
}


export async function getOrderById(req: Request, res: Response) {
    const id = parseInt(req.query.id as string);
    const order = await findOrderById(id);
    res.status(200).json(order);
}




export async function updateOrderStatus(req: Request, res: Response) {
    const id = parseInt(req.body.id);
    const status = OrderStatus[req.body.status as keyof typeof OrderStatus];

    const order = await updateOrder(id, { status });

    sendStatusEmail(order.receiver_email, status);
    res.status(200).json({ message: "Order status updated successfully", order });
}