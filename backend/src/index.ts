import express from 'express';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentsRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(cors({
    origin: ENV.FRONTEND_URL, // Replace with your frontend URL
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

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
