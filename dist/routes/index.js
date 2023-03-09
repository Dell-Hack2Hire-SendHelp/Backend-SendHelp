"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRoute_1 = __importDefault(require("./todoRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const router = (0, express_1.Router)();
router.use('/todo', todoRoute_1.default);
router.use('/auth', authRoute_1.default);
router.get('/', (req, res) => {
    res.json({ message: "Hello world" });
});
exports.default = router;