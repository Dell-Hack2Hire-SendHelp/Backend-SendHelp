"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlanter = exports.isApe = exports.isCustomer = exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    next();
}
exports.isAuthenticated = isAuthenticated;
function isCustomer(req, res, next) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== "CUSTOMER")
        return res.status(403).json({ error: "Not authorized. You must be a CUSTOMER to use this endpoint" });
    next();
}
exports.isCustomer = isCustomer;
function isApe(req, res, next) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== "APE")
        return res.status(403).json({ error: "Not authorized. You must be an APE to use this endpoint" });
    next();
}
exports.isApe = isApe;
function isPlanter(req, res, next) {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: "Not logged in" });
    if (req.user.role !== "PLANTER")
        return res.status(403).json({ error: "Not authorized. You must be a PLANTER to use this endpoint" });
    next();
}
exports.isPlanter = isPlanter;
