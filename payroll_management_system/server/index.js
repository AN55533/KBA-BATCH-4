import express, { json } from 'express';
import dotenv from 'dotenv';
import { adminauth } from './Routes/adminroute.js';
import { userauth } from './Routes/userroute.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(json())

 app.use('/', userauth);
app.use('/', adminauth);

app.get('/', function (req, res) {
    res.send("hello everyone")
});
mongoose.connect("mongodb://mongodb:27017/payroll_management_react").then(() => {

    console.log("MongoDB connected successfully payroll_react ");
})
    .catch((error) => {
        console.error("Mongodb connection failed", error)

    });


app.listen(process.env.PORT, function () {
    console.log(`server is listening at ${process.env.PORT}`);

});      
