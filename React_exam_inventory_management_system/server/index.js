import express, { json } from 'express';
import dotenv from 'dotenv';
import { adminauth } from './Routes/adminroutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(json())


app.use('/', adminauth);

app.get('/', function (req, res) {

    res.send("hello ")
});
mongoose.connect("mongodb://localhost:27017/inventorydetails").then(() => {

    console.log("MongoDB connected successfully inventorydetails ");
})
    .catch((error) => {
        console.error("Mongodb connection failed", error)

    });


app.listen(process.env.port, function () {
    console.log(`server is listening at ${process.env.port}`);
    });       
