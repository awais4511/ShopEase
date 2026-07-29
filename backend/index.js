import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import "dotenv/config";
import express from 'express';
import cors from 'cors';
import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const PORT =process.env.PORT || 5000;
const app=express();

app.use(express.json())
app.use(cors())
connectdb();
connectCloudinary();

app.get('/',(req ,res)=>{
    res.send("Api Working")
})

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(PORT ,()=>console.log("server is running on port " + PORT))