import { Schema } from 'mongoose'
import { model } from 'mongoose'

const LeaveSchema = new Schema({
    EMPID: { type: String, required: true, ref: "Employee" },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    leaveType: { type: String, required: true},
    reason: { type: String, required: true },
    leaveDays: { type: Number, required: true },
    paidLeaves: { type: Number, required: true },
    unpaidLeaves: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
}, { timestamps: true });
const Leave = model('leaveappication', LeaveSchema)
export default Leave