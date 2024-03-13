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
exports.getAccountId = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (roleToVerify) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers['access-token'];
        if (!token) {
            return res.status(401).json({ msg: "Access denied." });
        }
        try {
            const verified = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            if (!verified) {
                return res.status(500).json({ msg: "Internal server error." });
            }
            if (verified.role !== roleToVerify) {
                return res.status(403).json({ msg: "Access denied." });
            }
            req.headers["loggedInUserId"] = verified.accountId;
            next();
        }
        catch (err) {
            res.status(400).json({ msg: "Invalid token." });
        }
    });
};
exports.auth = auth;
const getAccountId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(401).json({ msg: "Access denied." });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (!verified) {
            return res.status(500).json({ msg: "Internal server error." });
        }
        req.headers["loggedInUserId"] = verified.accountId;
        next();
    }
    catch (err) {
        res.status(400).json({ msg: "Invalid token." });
    }
});
exports.getAccountId = getAccountId;
