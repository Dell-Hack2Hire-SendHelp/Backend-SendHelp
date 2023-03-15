"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appConfig_1 = require("./config/appConfig");
const initializeDefaultUser_1 = require("./test/initializeDefaultUser");
const app = (0, express_1.default)();
(0, appConfig_1.configureApplication)(app);
app.listen(app.get('port'), () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
    (0, initializeDefaultUser_1.initializeDefaultUser)();
});
