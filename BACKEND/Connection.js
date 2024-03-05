import mongoose from "mongoose";

const Connection = async (URL) => {
    try {
        await mongoose.connect(URL,);
        console.log("DataBase Connection Success!");
    }
    catch (error) {
        console.log("Connection failed ", error);
    }
}

export default Connection;