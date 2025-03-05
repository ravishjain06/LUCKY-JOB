import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectToMongoDB } from './dababaseConnection.js';

import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import cors from 'cors'

//For file upload on server
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: "https://lucky-job-frontend.vercel.app",
    // methods:"GET,POST,PUT,DELETE",
    credentials: true,
}

app.use(cors(corsOption))

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

const PORT = process.env.PORT || 8080;

// Start server

connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
