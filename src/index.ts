import express from 'express';
import { configureApplication } from './config/appConfig';

import { initializeDefaultUser } from './test/initializeDefaultUser';


const app = express();
configureApplication(app);


app.listen(
    app.get('port'), 
    ()=> {
        console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
        initializeDefaultUser();
    }
);