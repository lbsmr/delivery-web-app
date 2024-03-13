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
exports.getProduct = exports.getProducts = exports.updateProduct = exports.deleteProduct = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image } = req.body;
        const creatorId = req.headers["loggedInUserId"];
        if (!name || !description || !price || !image) {
            return res.status(400).json({ msg: "All fields must be entered." });
        }
        if (description.length > 50) {
            return res.status(400).json({ msg: "Description max length is 30 characters." });
        }
        const product = new product_1.default({
            name: name,
            description: description,
            price: price,
            image: image,
            creatorId: creatorId
        });
        yield product.save();
        return res.status(200).json({ msg: "Product created." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ msg: "No product id received." });
        }
        const productFound = yield product_1.default.findByIdAndDelete(productId);
        if (!productFound) {
            return res.status(404).json({ msg: "Product wasn't found." });
        }
        return res.status(200).json({ msg: "Item deleted." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const productUpdated = yield product_1.default.findByIdAndUpdate(productId, req.body, { new: true });
        if (!productUpdated) {
            return res.status(404).json({ msg: "Product wasn't found." });
        }
        return res.status(200).json({ msg: "Item updated." });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.updateProduct = updateProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        if (!products) {
            return res.status(400).json({ msg: "There are no products available." });
        }
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product wasn't found." });
        }
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.getProduct = getProduct;
