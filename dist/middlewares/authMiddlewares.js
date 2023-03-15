"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    next();
}
exports.isAuthenticated = isAuthenticated;
