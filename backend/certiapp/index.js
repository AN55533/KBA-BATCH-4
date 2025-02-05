import express, { json } from 'express';
import dotenv from 'dotenv';
import { adminRoute } from './Routes/adminroutes.js';

dotenv.config();

const app = express();
app.use(json())

app.use('/', adminRoute);

app.get('/', function (req, res) {
    res.send("hello everyone")
});
app.listen(process.env.PORT, function () {
    console.log(`server is listening at ${process.env.PORT}`);
    
});        
