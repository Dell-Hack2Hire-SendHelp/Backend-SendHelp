import { OrderStatus } from "@prisma/client";
import { DB } from "./db";

import { createPaginator } from 'prisma-pagination';

const db = DB.instance;
const paginate = createPaginator({ perPage: 10 });


interface OrderQueryParams {
    page: number;
    searchByUsername: string;
}



export async function getAllInReviewOrders({
    page,
    searchByUsername,
}: OrderQueryParams) {
    return await db.order.findMany({
        where: {
            status: OrderStatus.IN_REVIEW,
            customer: {
                username: {
                    contains: searchByUsername,
                    mode: "insensitive"
                }
            }
        },
    });
}