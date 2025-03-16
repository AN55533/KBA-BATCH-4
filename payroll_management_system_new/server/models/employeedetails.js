import { Schema } from 'mongoose'
import { model } from 'mongoose'
const employ = new Schema({
    Name: { type: String },
    EMPID: { type: String,required:true },
    Email: { type: String },
    Password: { type: String },
    MobileNo: { type: Number },
    Address: { type: String },
    Designation: { type: String },
    dateOfJoining: { type: Date },
    baseSalary: { type: Number },
    availableLeaves: { type: Number, default: 12 },                  
    netSalary: { type: Number },
})
const employee = model('employeedetails', employ)
export default employee