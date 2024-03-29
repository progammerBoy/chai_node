// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path: "./env"
    }
);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
    app.on("error", (err) => {
        console.log("Error: ", err);
        throw err;
    })
})
.catch((error) => { 
    console.log("MONGODB CONNECTION FAILED: ", error);
} )


/*
import express from "express";
const app = express();  

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGOdb_URI}/${DB_NAME}`)
        app.on("error", (err) => {  
            console.log("Error: ", err);
            throw err;
        } )

        app.listen(process.env.PORT, () => {    
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
})()
*/