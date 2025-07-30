import { connectDB } from "./lib/db";
import authRoute from "./routes/authRoute";
import noteRoute from "./routes/noteRoute";

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use("/api/note", noteRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
