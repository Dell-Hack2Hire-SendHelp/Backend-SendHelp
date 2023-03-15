import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import connectPg from 'connect-pg-simple';

import indexRouter from '../routes/index';
import { passport } from "../config/passport";


dotenv.config();



export function configureApplication(app: Express) {
    configurePort(app);
    configureHelmetSecurity(app);
    configureBodyParser(app);
    configureStaticFiles(app);
    configureViewEngine(app);
    configureSession(app);
    configurePassport(app);
    configureIndexRouter(app);
}


function configurePort(app: Express) {
    const port = process.env.PORT || 3000;
    app.set('port', port);
}

function configureHelmetSecurity(app: Express) {
    app.use(helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false,
    }));
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