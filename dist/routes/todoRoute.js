"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const db = new client_1.PrismaClient();
router.get('/', function (req, res) {
    res.send('Hello from APIv1 root route.');
});
router.get('/users', function (req, res) {
    res.send('List of APIv1 users.');
});
exports.default = router;
