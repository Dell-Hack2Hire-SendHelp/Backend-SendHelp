import { OrderStatus, Order, Prisma } from "@prisma/client";
import { DB } from "./db";

const db = DB.instance;



export async function findAllOrders() {
    return await db.order.findMany();
}


export async function findOrderById(id: number) {
    return await db.order.findUnique({
        where: { id }
    });
}


export async function findOrdersWhere(where: Prisma.OrderWhereInput) {
    return await db.order.findMany({
        where
    });
}






export async function insertNewOrder({
    receiversName,
    receiversEmail,
    treeNumbers,
    customerId,
    isCoordRequired,
    message = "This goes towards the restoration of the forest corridor along the Lower Kinabatangan, Sabah, malaysia, Borneo.",
    status = OrderStatus.IN_REVIEW,
}: {
    receiversName: string,
    receiversEmail: string,
    treeNumbers: number,
    customerId: number,
    isCoordRequired?: boolean,
    message?: string,
    status?: OrderStatus,
}) {
    await db.order.create({
        data: {
            receiver_name: receiversName,
            receiver_email: receiversEmail,
            trees_number: treeNumbers,
            customer: {
                connect: { id: customerId }
            },
            status,
            isCoordRequired,
            message,
        }
    });

    console.log(`Order created successfully at ${new Date().toLocaleString()}`);
}



export async function updateOrder(id: number, data: Partial<Order>) {
    return await db.order.update({
        where: { id },
        data
    });
}