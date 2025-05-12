import express from "express";
import router from "./routes/routes.js";
import Connection from "./Connection.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORTNO, MONGODB_URL } from "./middleware/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();



app.use(bodyParser.json());
app.use(cookieParser());

// Configure CORS to allow credentials and specify allowed origins
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Provide the absolute path to the 'uploads' directory
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.listen(PORTNO, () => {
  console.log(`App Running at PORT ${PORTNO}`);
  Connection(MONGODB_URL);
});


app.use('/', router);
