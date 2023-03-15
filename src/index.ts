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
// app.use(function(req, res, next) {
//     res.header('Content-Type', 'application/json;charset=UTF-8')
//     res.header('Access-Control-Allow-Credentials', 'true')
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Expose-Headers', 'set-cookie')
//     next()
//   });
configureApplication(app);

app.listen(
    app.get('port'), 
    async ()=> {
        console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
        await initializeDefaultUser();
        await initializeDefaultOrder();
    }
);