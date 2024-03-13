"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("./database");
const config_1 = __importDefault(require("./config"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const client_router_1 = __importDefault(require("./routes/client.router"));
const order_router_1 = __importDefault(require("./routes/order.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = config_1.default.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.use((0, cors_1.default)({
    origin: [config_1.default.FRONTEND_ORIGIN],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(auth_router_1.default);
app.use(product_router_1.default);
app.use(client_router_1.default);
app.use(order_router_1.default);
