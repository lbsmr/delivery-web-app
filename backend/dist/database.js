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
const mongoose_1 = __importDefault(require("mongoose"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield mongoose_1.default.connect('mongodb+srv://lbsmr:XUHLaqbRIkntds3O@delivery-web-app.tv8wid3.mongodb.net/test');
        console.log('Connected to: ' + db.connection.name);
    }
    catch (err) {
        console.error(err);
    }
}))();
//`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
//mongodb+srv://lbsmr:XUHLaqbRIkntds3O@delivery-web-app.tv8wid3.mongodb.net/test
//`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.tv8wid3.mongodb.net/test`
