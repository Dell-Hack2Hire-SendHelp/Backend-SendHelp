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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSuccessLogin = exports.onFailedLogin = exports.logOut = exports.signUp = exports.getStatus = void 0;
const authService_1 = require("../services/authService");
// To remove the password properties from the user object so to not expose it to the client
function removeUserCredentials(user) {
    return {
        id: user.id,
        username: user.username,
        role: user.role,
        fullname: user.fullname,
        email: user.email,
    };
}
function getStatus(req, res) {
    if (!req.user)
        return res.status(401).json({ error: "Not logged in" });
    res.status(200).json(removeUserCredentials(req.user));
}
exports.getStatus = getStatus;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password, fullname, role } = req.body;
        yield (0, authService_1.registerNewUser)(email, username, password, fullname, role);
        res.status(201).json({ message: "User created successfully. Please login." });
    });
}
exports.signUp = signUp;
function logOut(req, res) {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ error: `Error logging out: ${err.message}` });
        res.status(200).json({ message: "Logged out successfully." });
    });
}
exports.logOut = logOut;
function onFailedLogin(req, res) {
    res.status(401);
    res.json({ error: "Invalid username or password" });
}
exports.onFailedLogin = onFailedLogin;
function onSuccessLogin(req, res) {
    res.cookie("test", "yesy");
    // console.log(req.user);
    res.status(200).json({
        message: "Logged in successfully",
        // user: removeUserCredentials(req.user as AppUser),
    });
}
exports.onSuccessLogin = onSuccessLogin;
