
import { OrderStatus } from "@prisma/client";
import { Request, Response } from "express";

import { findOrdersWhere, updateOrder } from "../services/orderService";



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

    res.status(200).json({ message: "Order selected successfully", order });
}