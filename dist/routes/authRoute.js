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
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../config/db");
const db = db_1.DB.instance;
const router = (0, express_1.Router)();
router.get('/failedLogin', (req, res) => {
    res.status(401);
    res.json({ error: "Invalid username or password" });
});
router.get('/successfulLogin', (req, res) => {
    res.status(200);
    res.json({ message: "Logged in successfully" });
});
router.get('/status', (req, res) => {
    if (!req.user)
        return res.status(401).json({ error: "Not logged in" });
    res.status(200).json(req.user);
});
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/auth/successfulLogin',
    failureRedirect: '/auth/failedLogin',
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const passwordHash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
    yield db.user.create({
        data: {
            email: email,
            salt: salt,
            username: username,
            password: passwordHash,
        }
    });
    res.status(201).json({ message: "User created successfully. Please login." });
}));
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ error: `Error logging out: ${err.message}` });
        res.redirect('/');
    });
});
exports.default = router;
