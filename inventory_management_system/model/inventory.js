import { Schema } from 'mongoose'
import { model } from 'mongoose'
const demo = new Schema({
    ItemName: { type: String},
    Category: { type: String},
    Quantity: { type: String},
    Price: { type: String},
   
})
const inventory = model('inventorydetails', demo)
export default inventory;   