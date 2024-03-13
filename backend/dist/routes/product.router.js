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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productCtrl = __importStar(require("../controllers/product.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const productRouter = (0, express_1.Router)();
productRouter.post('/create-product', (0, auth_middleware_1.auth)("RESTAURANT"), productCtrl.createProduct);
productRouter.patch('/update-product/:id', (0, auth_middleware_1.auth)("RESTAURANT"), productCtrl.updateProduct);
productRouter.delete('/delete-product/:id', (0, auth_middleware_1.auth)("RESTAURANT"), productCtrl.deleteProduct);
productRouter.get('/products', auth_middleware_1.getAccountId, productCtrl.getProducts);
productRouter.get('/product/:id', auth_middleware_1.getAccountId, productCtrl.getProduct);
exports.default = productRouter;
