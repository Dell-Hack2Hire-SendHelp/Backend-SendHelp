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
exports.registerNewUser = exports.findUserByUsername = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("./db");
const db = db_1.DB.instance;
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.appUser.findUnique({
            where: {
                username
            }
        });
    });
}
exports.findUserByUsername = findUserByUsername;
function registerNewUser(email, username, password, fullname, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = crypto_1.default.randomBytes(16).toString('hex');
        const passwordHash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        yield db.appUser.create({
            data: {
                fullname: fullname,
                role: role,
                email: email,
                username: username,
                password: passwordHash,
                passwordSalt: salt,
            }
        });
        console.log(`User ${username} created successfully at ${new Date().toLocaleString()}`);
    });
}
exports.registerNewUser = registerNewUser;
