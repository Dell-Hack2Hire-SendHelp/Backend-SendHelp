import express from 'express';
import { configureApplication } from './config/appConfig';

import { initializeDefaultUser } from './test/initializeDefaultUser';
import { initializeDefaultOrder } from './test/initializeDefaultOrder';


const app = express();
configureApplication(app);


app.listen(
    app.get('port'), 
    async ()=> {
        console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
        await initializeDefaultUser();
        await initializeDefaultOrder();
    }
);