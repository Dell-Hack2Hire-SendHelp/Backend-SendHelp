"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRoute_1 = __importDefault(require("./todoRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const apeRoute_1 = __importDefault(require("./apeRoute"));
const custRoute_1 = __importDefault(require("./custRoute"));
const sukauRoute_1 = __importDefault(require("./sukauRoute"));
const router = (0, express_1.Router)();
router.use('/todo', todoRoute_1.default);
router.use('/auth', authRoute_1.default);
router.use('/ape', apeRoute_1.default);
router.use('/cust', custRoute_1.default);
router.use('/sukau', sukauRoute_1.default);
router.post('/', (req, res) => {
    console.log(req.file);
    res.send('Hello World!');
});
exports.default = router;
