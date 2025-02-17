import { Router } from 'express'
import inventory from '../model/inventory.js';

const adminauth = Router();

adminauth.get('/', (req, res) => {
    console.log('hello every one')
})
adminauth.post("/adddata", async (req, res) => {
    try {
        const { ItemName, Category, Quantity, Price } = req.body;
        const existingdata = await inventory.findOne({ ItemName: ItemName })
        if (existingdata) {
            res.status(400).json({ msg: "data  already exist" });
        }
        else {
           
            const newdata = new inventory({
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


adminauth.get('/getdata/:ItemName', async (req, res) => {
    const ItemName = req.params.ItemName
    console.log(ItemName);
    const result = await inventory.find({ ItemName })
    if (result) {
        console.log(result);
        res.status(200).json(result)
    } else {
        res.status(400).json({ message: 'inventory  details not available' })
    }

})







adminauth.put('/updatedetails', async (req, res) => {

   
    const { ItemName, Category, Quantity, Price } = req.body;
    const result = await inventory.findOne({ ItemName: ItemName })
        if (result) {

            result.ItemName = ItemName,
                result.Category = Category,
                result.Quantity = Quantity,
                result.Price = Price,
                
            await result.save();

            console.log(result);
            res.status(201).json({ msg: `${ItemName} updated successfully` })

        }
        else {
            res.status(400).json({ msg: "ItemName name already updated" });

        }


    
})

adminauth.delete('/delete', async (req, res) => {

    ItemName = req.params.ItemName;
    const result = await inventory.findByIdAndDelete((ItemName))
    console.log(result);
    res.status(200).send("inventory  details deleted successfully ");

})

export { adminauth }