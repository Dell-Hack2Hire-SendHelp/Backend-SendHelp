
import { insertNewOrder, findOrderById, findOrderByReceiverName } from "../services/orderService";



export async function initializeDefaultOrder() {
    console.log("Initializing default orders...");

    const order1 = await findOrderByReceiverName("Customer 1 Order");

    if (!order1) 
        await insertNewOrder({
            receiverName: "Customer 1 Order",
            receiverEmail: "customer1@gmail.com",
            treesNumbers: 10,
            customerId: 1,
        });

    console.log("Default orders initialized successfully.");
}