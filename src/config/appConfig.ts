import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import multer from 'multer';
import fs from 'fs';

import indexRouter from '../routes/index';
import { passport } from "../config/passport";


dotenv.config();



export function configureApplication(app: Express) {
    configurePort(app);
    // configureHelmetSecurity(app);
    configureMulter(app);
    configureBodyParser(app);
    configureStaticFiles(app);
    configureViewEngine(app);
    configureSession(app);
    configurePassport(app);
    configureIndexRouter(app);
}


function configureMulter(app: Express) {
    // Create dir if not exists
    const dir = 'public/uploads';
    
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    const upload = multer({ storage });
    app.use(upload.single('image'));
}


function configurePort(app: Express) {
    const port = process.env.PORT || 3000;
    app.set('port', port);
}

function configureHelmetSecurity(app: Express) {
    app.use(helmet());
}

function configureBodyParser(app: Express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

function configureStaticFiles(app: Express) {
    app.use(express.static('public'));
}

function configureViewEngine(app: Express) {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
}

function configureSession(app: Express) {
    const PostgreSQLStore = connectPg(session);

    const sessionMiddleware = session({
        store: new PostgreSQLStore({
            conString: process.env.DATABASE_URL,
            createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET || 'SECRET',
        resave: false,
        saveUninitialized: false,
    });
    app.use(sessionMiddleware);
}

function configurePassport(app: Express) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function configureIndexRouter(app: Express) {
    app.use('/', indexRouter);
}