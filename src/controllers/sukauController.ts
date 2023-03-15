
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findOrdersWhere, updateOrder } from "../services/orderService";
import { sendStatusEmail } from "../services/mailService";



export async function getApprovedOrders(req: Request, res: Response) {
    const orders = await findOrdersWhere({
        status: OrderStatus.APPROVED
    });
    res.status(200).json(orders);
}


export async function getMySelectedOrders(req: Request, res: Response) {
    const orders = await findOrdersWhere({
        status: OrderStatus.PLANTING,
        planter: {
            id: req.user!.id,
        }
    });
    res.status(200).json(orders);
}


export async function selectToPlantOrder(req: Request, res: Response) {
    const id = parseInt(req.body.id);

    const order = await updateOrder(id, {
        status: OrderStatus.PLANTING,
        planter_id: req.user!.id,
    });

    sendStatusEmail(order.receiver_email, OrderStatus.PLANTING);
    res.status(200).json({ message: "Order selected successfully", order });
}


export async function completeOrder(req: Request, res: Response) {
    const id = parseInt(req.body.id);
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const order = await updateOrder(id, {
        status: OrderStatus.COMPLETED,
        latitude,
        longitude,
    });

    sendStatusEmail(order.receiver_email, OrderStatus.COMPLETED);
    res.status(200).json({ message: "Order completed successfully", order });
}