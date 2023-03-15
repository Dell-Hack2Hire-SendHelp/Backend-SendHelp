"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApplication = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const index_1 = __importDefault(require("../routes/index"));
const passport_1 = require("../config/passport");
dotenv_1.default.config();
function configureApplication(app) {
    configurePort(app);
    // configureHelmetSecurity(app);
    configureBodyParser(app);
    configureStaticFiles(app);
    configureViewEngine(app);
    configureSession(app);
    configurePassport(app);
    configureIndexRouter(app);
}
exports.configureApplication = configureApplication;
function configurePort(app) {
    const port = process.env.PORT || 3000;
    app.set('port', port);
}
function configureHelmetSecurity(app) {
    app.use((0, helmet_1.default)());
}
function configureBodyParser(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
}
function configureStaticFiles(app) {
    app.use(express_1.default.static('public'));
}
function configureViewEngine(app) {
    app.set('views', path_1.default.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
}
function configureSession(app) {
    const PostgreSQLStore = (0, connect_pg_simple_1.default)(express_session_1.default);
    const sessionMiddleware = (0, express_session_1.default)({
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
function configurePassport(app) {
    app.use(passport_1.passport.initialize());
    app.use(passport_1.passport.session());
}
function configureIndexRouter(app) {
    app.use('/', index_1.default);
}
