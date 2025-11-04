import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express(); //creates web server

app.use(express.json({ limit: "16kb"}))

app.use(cookieParser())

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static('public'))

//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// import the routes

import healthCheckRouter from './routes/healthcheck.routes.js';
import authRouter from "./routes/auth.routes.js"

//server jispar run karta hai uske baad --> in our case http://localhost:3000  routes are below

app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter)

export default app;