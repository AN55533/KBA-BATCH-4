import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import employee from "../models/employeedetails.js";
import Leave from "../models/leavedetails.js";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/user.js";
import userauthenticate from "../Middleware/user.js";
import employeesalary from "../models/employsalary_records.js";



dotenv.config();

const userauth = Router();

       


userauth.post('/login', async (req, res) => {
    try {
        const { EMPID, Password} = req.body;
        const result = await employee.findOne({ EMPID})
        
        if (!result) {
            res.status(400).send("Enter a valid username");
        }
        else {
            console.log(result.Password);
            const valid =await bcrypt.compare(Password, result.Password);
            console.log(valid);
            if (valid) {
                const token = jwt.sign({ EMPID: result.EMPID, Name: result.Name }, process.env.SECRET_KEY, { expiresIn: '1h' });
                console.log(token);
                res.cookie('payrollToken1', token,
                    {
                        httpOnly: true
                    });
                res.status(200).json({ message: "Logged in successfully" });
            }
            else {

                res.status(401).send("Unauthorized access");

            }
        }

    }
    catch {
        res.status(500).send("Internal Server Error")
    }
})



userauth.get('/getemployee/:EMPID', async (req, res) => {
    try {
        const EMPID = req.params.EMPID;
        console.log("Fetching employee with EMPID:", EMPID);

        const result = await employee.findOne({ EMPID: EMPID });

        if (result) {
            res.status(200).json({
                ...result._doc,
                availableLeaves: result.availableLeaves || 12
            });
        } else {
            res.status(404).json({ message: 'Employee details not available' });
        }
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Server error" });
    }
});


userauth.get('/mysalary/:EMPID', async (req, res) => {
    try {
        const { EMPID } = req.params;

        // Fetch salary records for the given EMPID, sorted by month in descending order
        const salaryRecords = await employeesalary.find({ EMPID }).sort({ month: -1 });

        if (!salaryRecords || salaryRecords.length === 0) {
            return res.status(404).json({ message: 'No salary records found' });
        }

        res.status(200).json(salaryRecords);
    } catch (error) {
        console.error('Error fetching salary records:', error);
        res.status(500).json({ message: 'Error fetching salary records' });
    }
});



userauth.get("/getleaves/:EMPID", async (req, res) => {
    try {
        const leaves = await Leave.find({ EMPID: req.params.EMPID });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


userauth.post("/applyleave", async (req, res) => {
    try {
        const { EMPID, fromDate, toDate, leaveType, reason, leaveDays } = req.body;

        // Validate input
        if (!EMPID || !fromDate || !toDate || !leaveType || !reason || !leaveDays || leaveDays <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Find the employee
        const Employee = await employee.findOne({ EMPID });
        if (!Employee) return res.status(404).json({ message: "Employee not found" });

        let remainingLeaves = Employee.availableLeaves;
        let paidLeaves = 0;
        let unpaidLeaves = 0;

        // Leave calculation logic
        if (leaveDays > 12) {
            paidLeaves = leaveDays - 12; // Extra leaves go to paid leaves
            unpaidLeaves = 12; // Unpaid leaves capped at 12
        } else {
            paidLeaves = Math.min(leaveDays, remainingLeaves);
            unpaidLeaves = leaveDays > remainingLeaves ? leaveDays - remainingLeaves : 0;
        }

        // Create new leave record
        const newLeave = new Leave({
            EMPID,
            fromDate,
            toDate,
            leaveType,
            reason,
            leaveDays,
            paidLeaves,
            unpaidLeaves,
            status: "Pending",
        });

        await newLeave.save();

        // Update employee leave balance
        await employee.updateOne(
            { EMPID },
            {
                $set: { availableLeaves: remainingLeaves - paidLeaves },
                $inc: { totalLeaveDays: leaveDays }
            }
        );

        res.status(201).json({
            message: "Leave applied successfully",
            availableLeaves: remainingLeaves - paidLeaves,
            totalLeaveDays: Employee.totalLeaveDays + leaveDays,
        });

    } catch (error) {
        console.error("Error applying for leave:", error);
        res.status(500).json({ message: "Error applying for leave" });
    }
});





userauth.get("/profile", userauthenticate, async (req, res) => {
    try {
        const EMPID = req.user; 

       
        if (!EMPID) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }


        const employeeData = await employee.findOne({ EMPID }).select("-Password");

        if (!employeeData) {
            return res.status(404).json({ msg: "Employee not found" });
        }

        res.status(200).json(employeeData);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});
userauth.put("/updateuserprofile", authenticate, async (req, res) => {
    try {
        const { Name, Email, MobileNo, Address,Password } = req.body;

        const updatedEmployee = await employee.findOneAndUpdate(
            { EMPID: req.user },
            { Name, Email, MobileNo, Address, Password },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", employee: updatedEmployee });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


userauth.get("/logout", (req, res) => {
    res.clearCookie('payrollToken1');
    res.status(200).json({ msg: "logout successfully" })

})


export { userauth };