"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const appConfig_1 = require("./config/appConfig");
const initializeDefaultUser_1 = require("./test/initializeDefaultUser");
const initializeDefaultOrder_1 = require("./test/initializeDefaultOrder");
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
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
(0, appConfig_1.configureApplication)(app);
app.listen(app.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
    yield (0, initializeDefaultUser_1.initializeDefaultUser)();
    yield (0, initializeDefaultOrder_1.initializeDefaultOrder)();
}));
