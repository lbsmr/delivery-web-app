"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const address = {
    city: String,
    street: String,
    resNum: Number,
    department: Boolean,
    zip: Number
};
const payment = {
    paymentType: String,
    nameOnCard: String,
    expiration: Date,
    cvv: Number,
    creditNumber: Number
};
const orderSchema = new mongoose_1.Schema({
    buyerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    restaurantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    products: Array,
    payment: payment,
    address: address,
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    }
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
