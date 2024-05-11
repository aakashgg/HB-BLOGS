import express from "express";
import router from "./routes/routes.js";
import Connection from "./Connection.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({ credentials: true, origin: 'https://hb-blogs-frontend.vercel.app/' }));
app.use(cookieParser());

// Provide the absolute path to the 'uploads' directory
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

const URL = process.env.MONGODB_URL;
app.listen(PORT, () => {
    console.log(`App Running at PORT ${PORT}`);
    Connection(URL);
});

app.use('/', router);
