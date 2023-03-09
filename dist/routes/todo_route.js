"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.send('Hello from APIv1 root route.');
});
router.get('/users', function (req, res) {
    res.send('List of APIv1 users.');
});
exports.default = router;
