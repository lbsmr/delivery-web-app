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
exports.clearCart = exports.removeFromCart = exports.reduceCart = exports.getCart = exports.addToCart = void 0;
const account_1 = __importDefault(require("../models/account"));
const product_1 = __importDefault(require("../models/product"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.body.productId;
        let targetProduct;
        const id = req.headers["loggedInUserId"];
        if (!productId) {
            return res.status(404).json({ msg: "Not found." });
        }
        const product = yield product_1.default.findById(productId);
        targetProduct = product;
        const account = yield account_1.default.findById(id);
        account.addToCart(targetProduct);
        return res.status(200).json({ msg: "Product added to cart." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.headers["loggedInUserId"];
        const account = yield account_1.default.findById(id);
        const cartProducts = account.cart.products;
        let cartInfo = [];
        let totalPrice = 0;
        for (let i = 0; i < cartProducts.length; i++) {
            const product = yield product_1.default.findById(cartProducts[i].productId);
            cartInfo.push({ "productInfo": product, "quantity": cartProducts[i].quantity });
            totalPrice = totalPrice + cartProducts[i].quantity * product.price;
        }
        return res.status(200).json({ "cartInfo": cartInfo, "totalPrice": totalPrice });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.getCart = getCart;
const reduceCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const id = req.headers["loggedInUserId"];
        if (!productId) {
            res.status(404).json({ msg: "Not found." });
        }
        const account = yield account_1.default.findById(id);
        account.reduceQuantity(productId);
        return res.status(200).json({ msg: "Quantity reduced." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.reduceCart = reduceCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const id = req.headers["loggedInUserId"];
        if (!productId) {
            res.status(404).json({ msg: "Not found." });
        }
        const account = yield account_1.default.findById(id);
        account.removeFromCart(productId);
        return res.status(200).json({ msg: "Removed from cart." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.headers["loggedInUserId"];
        const account = yield account_1.default.findById(id);
        account.clearCart();
        return res.status(200).json({ msg: "Cart cleared." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.clearCart = clearCart;
