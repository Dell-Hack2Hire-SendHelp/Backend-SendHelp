import { Request, Response } from "express";
import { insertNewOrder, findOrdersWhere } from "../services/orderService";



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


export async function getMyOrders(req: Request, res: Response) {
    const orders = await findOrdersWhere({
        customer: {
            id: req.user!.id,
        }
    });
    res.status(200).json(orders);
}



export async function getMyOrderById(req: Request, res: Response) {
    const id = parseInt(req.query.id as string);
    
    const orders = await findOrdersWhere({
        id,
        customer: {
            id: req.user!.id,
        }
    });
    res.status(200).json(orders);
}