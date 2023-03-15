import { Request, Response } from "express";
import { insertNewOrder } from "../services/orderService";

export async function createPurchase(req: Request, res: Response) {
    const order = {
        receiversName: req.body.receiversName,
        receiversEmail: req.body.receiversEmail,
        treeNumbers: parseInt(req.body.treeNumbers),
        isCoordRequired: req.body.isCoordRequired,
        message: req.body.message,
        customerId: req.user!.id,
    }
    
    await insertNewOrder(order);
    res.status(201).json({ message: "Order created successfully" });
}
