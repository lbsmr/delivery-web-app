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
exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const account_1 = __importDefault(require("../models/account"));
const product_1 = __importDefault(require("../models/product"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, street, resNum, apartment, zip, paymentType, nameOnCard, expiration, cvv, creditNumber } = req.body;
        console.log(req.body);
        const id = req.headers["loggedInUserId"];
        const buyer = yield account_1.default.findById(id);
        const cartProducts = buyer.cart.products;
        let totalPrice = 0;
        let restaurantId;
        for (let i = 0; i < cartProducts.length; i++) {
            const product = yield product_1.default.findById(cartProducts[i].productId);
            totalPrice = totalPrice + cartProducts[i].quantity * product.price;
            restaurantId = product.creatorId;
        }
        if (!city || !street || !resNum || !zip || !paymentType) {
            return res.status(400).json({ msg: "All fields must be entered." });
        }
        switch (paymentType) {
            case "Cash":
                const newOrder = new order_1.default({
                    buyerId: buyer._id,
                    restaurantId: restaurantId,
                    address: {
                        city: city,
                        street: street,
                        resNum: resNum,
                        apartment: apartment,
                        zip: zip
                    },
                    payment: {
                        paymentType: paymentType
                    },
                    products: cartProducts,
                    totalAmount: totalPrice
                });
                yield newOrder.save();
                buyer.clearCart();
                break;
            case "Debit":
                if (!nameOnCard || !expiration || !cvv) {
                    return res.status(400).json({ msg: "All fields must be entered." });
                }
                const newOrder1 = new order_1.default({
                    buyerId: buyer._id,
                    restaurantId: restaurantId,
                    address: {
                        city: city,
                        street: street,
                        resNum: resNum,
                        apartment: apartment,
                        zip: zip
                    },
                    payment: {
                        paymentType: paymentType,
                        nameOnCard: nameOnCard,
                        expiration: expiration,
                        cvv: cvv
                    },
                    products: cartProducts,
                    totalAmount: totalPrice
                });
                yield newOrder1.save();
                buyer.clearCart();
                break;
            case "Credit":
                if (!nameOnCard || !expiration || !cvv || !creditNumber) {
                    return res.status(400).json({ msg: "All fields must be entered." });
                }
                const newOrder2 = new order_1.default({
                    buyerId: buyer._id,
                    restaurantId: restaurantId,
                    address: {
                        city: city,
                        street: street,
                        resNum: resNum,
                        apartment: apartment,
                        zip: zip
                    },
                    payment: {
                        paymentType: paymentType,
                        nameOnCard: nameOnCard,
                        expiration: expiration,
                        cvv: cvv,
                        creditNumber: creditNumber
                    },
                    products: cartProducts,
                    totalAmount: totalPrice
                });
                yield newOrder2.save();
                buyer.clearCart();
                break;
        }
        return res.status(200).json({ msg: "Order created." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.headers["loggedInUserId"];
        const account = yield account_1.default.findById(id);
        let orders = yield order_1.default.find({ email: account.email }).sort({
            createdAt: -1,
        });
        return res.status(200).json(orders);
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.getOrders = getOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const order = yield order_1.default.findById(orderId);
        return res.status(200).json(order);
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.getOrder = getOrder;
