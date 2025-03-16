import { Schema } from 'mongoose'
import { model } from 'mongoose'
const employsalary = new Schema({
    EMPID: { type: String, required: true },
    name: { type: String, required: true },
    netSalary: { type: Number, required: true },
    Status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    month: { type: String, required: true },
    SalaryDate: { type: Date, required: true },
})
const employeesalary = model('empsalarydetails', employsalary)
export default employeesalary