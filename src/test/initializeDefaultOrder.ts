
import { insertNewOrder, findOrderById, findOrderByReceiverName } from "../services/orderService";



export async function initializeDefaultOrder() {
    console.log("Initializing default orders...");

    const order1 = await findOrderByReceiverName("Customer 1 Order");

    if (!order1) 
        await insertNewOrder({
            receiversName: "Customer 1 Order",
            receiversEmail: "customer1@gmail.com",
            treeNumbers: 10,
            customerId: 1,
        });

    console.log("Default orders initialized successfully.");
}