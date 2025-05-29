import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userDetailsRoutes from './routes/userDetails.Route.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173', // or use '*' to allow all
    credentials: true, // if you're using cookies or authorization headers
  }));


app.use (express.json()); // allow express to parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // allow express to parse URL-encoded data

app.use(cookieParser()); // allow express to parse cookies in the request
app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    connectDB();
});