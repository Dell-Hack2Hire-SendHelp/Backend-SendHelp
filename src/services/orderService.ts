import { OrderStatus, Order, Prisma } from "@prisma/client";
import { DB } from "./db";

import { createPaginator } from 'prisma-pagination';

const db = DB.instance;
const paginate = createPaginator({ perPage: 10 });


interface OrderQueryParams {
    page: number;
    searchByUsername: string;
}



function getFilterObject(status: OrderStatus, searchByUsername: string): Prisma.OrderFindManyArgs {
    return {
        where: {
            status: status,
            customer: {
                username: {
                    contains: searchByUsername,
                    mode: "insensitive"
                }
            }
        }
    };
}



export async function insertNewOrder({
    receiverName,
    receiverEmail,
    treesNumbers,
    customerId,
    isCoordRequired,
    message = "This goes towards the restoration of the forest corridor along the Lower Kinabatangan, Sabah, malaysia, Borneo.",
    status = OrderStatus.IN_REVIEW,
}: {
    receiverName: string,
    receiverEmail: string,
    treesNumbers: number,
    customerId: number,
    isCoordRequired?: boolean,
    message?: string,
    status?: OrderStatus,
}) {
    await db.order.create({
        data: {
            receiver_name: receiverName,
            receiver_email: receiverEmail,
            trees_number: treesNumbers,
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



export async function findOrderById(id: number) {
    return await db.order.findUnique({
        where: { id }
    });
}


export async function findOrderByReceiverName(receiverName: string) {
    return await db.order.findFirst({
        where: {
            receiver_name: receiverName
        }
    });
}



export async function getAllInReviewOrders({
    page,
    searchByUsername,
}: OrderQueryParams) {
    return await paginate<Order, Prisma.OrderFindManyArgs>(
        db.order,
        getFilterObject(OrderStatus.IN_REVIEW, searchByUsername),
        { page, }
    );
}
