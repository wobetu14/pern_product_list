import express from 'express';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

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

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
