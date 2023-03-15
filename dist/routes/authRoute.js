"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../services/db");
const db = db_1.DB.instance;
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
router.get('/failedLogin', authController_1.onFailedLogin);
router.get('/successfulLogin', authController_1.onSuccessLogin);
router.get('/status', authController_1.getStatus);
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/auth/successfulLogin',
    failureRedirect: '/auth/failedLogin',
}));
router.post('/signup', authController_1.signUp);
router.post('/logout', authController_1.logOut);
exports.default = router;
