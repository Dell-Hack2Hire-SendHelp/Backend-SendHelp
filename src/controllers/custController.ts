import { Request, Response } from "express";
import { isCustomer } from "../middlewares/authMiddlewares";
import { insertNewOrder } from "../services/orderService";

export function createPurchase(req: Request, res: Response) {
    const { order } = req.body;
    order.customerId = req.user!.id;
    insertNewOrder(order);
    res.status(201).json({ message: "Order created successfully" });
}