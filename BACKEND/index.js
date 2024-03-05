import express from "express";
import router from "./routes/routes.js"
import Connection from "./Connection.js";
import bodyParser from "body-parser";
import dotenv from "dotenv"
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
app.listen(PORT, () => {
    console.log(`App Running at PORT ${PORT}`);
    Connection(URL);
})

app.use('/', router);