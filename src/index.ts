import express from 'express';
import cors from 'cors';
import { configureApplication } from './config/appConfig';

import { initializeDefaultUser } from './test/initializeDefaultUser';
import { initializeDefaultOrder } from './test/initializeDefaultOrder';

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
};


const app = express();
app.use(cors(corsOptions));
configureApplication(app);

app.listen(
    app.get('port'), 
    async ()=> {
        console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
        await initializeDefaultUser();
        await initializeDefaultOrder();
    }
);