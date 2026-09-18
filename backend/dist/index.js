"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const express_2 = require("@clerk/express");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const commentsRoutes_1 = __importDefault(require("./routes/commentsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_2.clerkMiddleware)());
app.use((0, cors_1.default)({
    origin: env_1.ENV.FRONTEND_URL, // Replace with your frontend URL
}));
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to ProductList API - Powered by PostgreSQL, Drizzle ORM and Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        },
    });
});
app.use("api/users", userRoutes_1.default);
app.use("api/products", productRoutes_1.default);
app.use("api/comments", commentsRoutes_1.default);
app.listen(env_1.ENV.PORT, () => {
    console.log(`Server is running on port ${env_1.ENV.PORT} in ${env_1.ENV.NODE_ENV} mode`);
});
