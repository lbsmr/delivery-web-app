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
exports.loggedIn = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_1 = __importDefault(require("../models/account"));
const config_1 = __importDefault(require("../config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, passwordCheck, role, bankName, bankAccountNumber } = req.body;
        let accountRole = "";
        if (!email || !password || !passwordCheck || !name) {
            return res.status(400).json({ msg: "All fields must be entered." });
        }
        const accountExists = yield account_1.default.findOne({ email: email });
        if (accountExists) {
            return res.status(400).json({ msg: "Email is already in use." });
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password needs to be at least 8 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Passwords don`t match." });
        }
        const salt = bcrypt_1.default.genSaltSync();
        const passwordHash = bcrypt_1.default.hashSync(password, salt);
        if (!role) {
            accountRole = "CLIENT";
            const account = new account_1.default({
                email: email,
                name: name,
                password: passwordHash,
                role: accountRole
            });
            yield account.save();
            const token = jsonwebtoken_1.default.sign({ accountId: account._id, role: account.role }, config_1.default.JWT_SECRET);
            return res.status(200).json({
                "token": token
            });
        }
        else {
            accountRole = role;
            if (!bankName || !bankAccountNumber) {
                return res.status(400).json({ msg: "All fields must be entered." });
            }
            const account = new account_1.default({
                email: email,
                name: name,
                password: passwordHash,
                role: accountRole,
                bankName: bankName,
                bankAccountNumber: bankAccountNumber
            });
            yield account.save();
            const token = jsonwebtoken_1.default.sign({ accountId: account._id, role: account.role }, config_1.default.JWT_SECRET);
            return res.status(200).json({
                "token": token
            });
        }
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields must be entered." });
        }
        const account = yield account_1.default.findOne({ email: email });
        if (!account) {
            return res.status(400).json({ msg: "Account does not exist." });
        }
        const isMatch = bcrypt_1.default.compareSync(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong credentials." });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ accountId: account._id, role: account.role }, config_1.default.JWT_SECRET);
            return res.status(200).json({
                "token": token
            });
        }
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.login = login;
const loggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('access-token');
        if (!token) {
            return res.json(false);
        }
        jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        res.send(true);
    }
    catch (err) {
        res.json({ err: err.message });
    }
});
exports.loggedIn = loggedIn;
