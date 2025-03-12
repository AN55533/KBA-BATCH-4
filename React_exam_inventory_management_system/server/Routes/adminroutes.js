import { Router } from 'express'
import inventory1 from '../model/inventory.js';

const adminauth = Router();

adminauth.get('/', (req, res) => {
    console.log('hello every one')
})
adminauth.post("/adddata", async (req, res) => {
    try {
        const { ItemName, Category, Quantity, Price } = req.body;
        const existingdata = await inventory1.findOne({ ItemName: ItemName })
        if (existingdata) {
            res.status(400).json({ msg: "data  already exist" });
        }
        else {
           
            const newdata = new inventory1({
                ItemName: ItemName,
                Category: Category,
                Quantity: Quantity,
                Price: Price,
            });
            await newdata.save();
            res.status(201).json({ msg: `${ItemName} stored successfully` })

        }
    }
    catch {
        res.status(500).send("Internal Server error");
    }

})


adminauth.get('/getinventory', async (req, res) => {

    const result = await inventory1.find()
    if (result) {
        console.log(result);
        res.status(200).json(result)
    } else {
        res.status(400).json({ message: 'inventory details not available' })
    }

})


export { adminauth }