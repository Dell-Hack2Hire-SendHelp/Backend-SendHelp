"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_local_1 = require("passport-local");
const crypto = __importStar(require("crypto"));
const db_1 = require("./db");
// Define how to serialize the user object into the session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Define how to deserialize the user object from the session to be put in req.user
passport_1.default.deserializeUser((id, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const u = yield db_1.DB.instance.user.findUnique({
        where: { id }
    });
    cb(null, u);
}));
// Username + Password Local Strategy. 
// Define the function here to match username and password with the database
const localStrategy = new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
}, (username, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.DB.instance.user.findFirst({
        where: {
            username: username
        }
    });
    // No user found
    if (!user)
        return cb(null, false, { message: "Incorrect username or password" });
    // Incorrect password
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
    if (user.password !== hash)
        return cb(null, false, { message: "Incorrect username or password" });
    return cb(null, user, { message: "Logged in successfully" });
}));
passport_1.default.use(localStrategy);
