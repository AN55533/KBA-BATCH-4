import { Schema } from 'mongoose'
import { model } from 'mongoose'
const demo = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    UserRole: { type: String, required: true },

})
const sample = model('Admindetails', demo)
export default sample;   
