"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 50,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        unique: true,
        requires: true
    },
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
