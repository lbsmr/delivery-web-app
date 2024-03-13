"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'ofo+12#ET$@#@',
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'database',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_USER: process.env.MONGO_USER || 'user',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'ORJ@#%F45342',
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5173'
};
