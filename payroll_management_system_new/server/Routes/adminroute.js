import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sample from "../models/admindetails.js";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminauth.js";
import employee from "../models/employeedetails.js";
import Leave from "../models/leavedetails.js";
import employeesalary from "../models/employsalary_records.js";

dotenv.config();

const adminauth = Router();


adminauth.get('/', (req, res) => {
    console.log("HI");
    res.send("Hello Everyone");
});

adminauth.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        console.log(FirstName);
        const existingUser = await sample.findOne({ UserName: UserName });

        if (existingUser) {
            console.log("Username already exist");
            res.status(400).send("Username already exist");
        }
        else {
            const newPassword = await bcrypt.hash(Password, 10);
            console.log(newPassword);

            const newUser = new sample({
                FirstName: FirstName,
                LastName: LastName,
                UserName: UserName,
                Password: newPassword,
                UserRole: UserRole,
               
    

            });
            await newUser.save();


            // user.set(UserName, { FirstName, LastName, Password: newPassword, UserRole });
            res.status(201).send("Signed-up successfully")
            console.log(newUser);
        }
    }
    catch {
        res.status(500).send("Internal Server error");
    }
    

})

adminauth.get("/getadmin/:userName", async (req, res) => {
    const userName = req.params.userName
    console.log(userName);
    const result = await sample.find({ userName })
    if (result) {
        console.log(result);
        res.status(200).json(result)
    } else {
        res.status(400).json({ message: 'admin details not available' })
    }

})

adminauth.post('/adminlogin', async(req, res) => {
    try {
        const { UserName, Password } = req.body;
        const result = await sample.findOne({ UserName: UserName })
        if (!result) {
            res.status(400).send("Enter a valid username");
        }
        else {
            console.log(result.Password);
            const valid =await bcrypt.compare(Password, result.Password);
            console.log(valid);
            if (valid) {
                const token = jwt.sign({ UserName: result.UserName, UserRole: result.UserRole }, process.env.SECRET_KEY, { expiresIn: '1h' });
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


adminauth.post("/addemployee", authenticate, adminCheck, async (req, res) => {
    try {
        const { Name, EMPID, Email, Password, MobileNo, Address, Designation, dateOfJoining, baseSalary } = req.body;
        const existingemployee = await employee.findOne({ EMPID: EMPID })
        if (existingemployee) {
            res.status(400).json({ msg: "Employee name already exist" });
        }
        else {
            const newPassword = await bcrypt.hash(Password, 10);
            const newEmployee = new employee({
                Name: Name,
                EMPID: EMPID,
                Email: Email,
                Password: newPassword,
                MobileNo: MobileNo,
                Address: Address,
                Designation: Designation,
                baseSalary: baseSalary,
                dateOfJoining: dateOfJoining
            });
            await newEmployee.save();
            res.status(201).json({ msg: `${EMPID} details stored successfully` })

        }


    }
    catch {
        res.status(500).send("Internal Server error");
    }

})

adminauth.get("/getemployee/:EMPID", async (req, res) => {
    try {
        const { EMPID } = req.params;
        console.log("Fetching employee data for EMPID:", EMPID); 
        const employe = await employee.findOne({ EMPID: EMPID })

        if (!employe) {
            return res.status(404).json({ message: "Employee not found" });
        }

        console.log("Employee Data:", employe); 
        res.json(employe);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Server error" });
    }
});


adminauth.get("/employees", async (req, res) => {
    try {
        const employees = await employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
});

adminauth.get('/getemployee', async (req, res) => {
    try {
        const employees = await employee.find();
        if (employees.length > 0) {
            res.status(200).json(employees);
        } else {
            res.status(404).json({ message: 'No employee details available' });
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


adminauth.put('/updateemployeedetails/:EMPID', authenticate,adminCheck, async (req, res) => {

    const { Name, EMPID, Email, Password, MobileNo, Address, Designation, baseSalary, DateofJoining } = req.body;
    const result = await employee.findOne({ EMPID: EMPID })
        if (result) {

            result.EMPID = EMPID,
                result.Name = Name,
                result.Email = Email,
                result.Password = Password,
                result.MobileNo = MobileNo,
                result.Address = Address,
                result.Designation = Designation,
                result.baseSalary = baseSalary,
                result.dateOfJoining =DateofJoining
            await result.save();

            console.log(result);
            res.status(201).json({ msg: `${EMPID} employee details updated successfully` })

        }
        else {
            res.status(400).json({ msg: "employee details already updated" });

        }


    // }
})
adminauth.delete("/deleteemployee/:EMPID", authenticate, adminCheck, async (req, res) => {
    const EMPID = req.params.EMPID;
    const result = await employee.findOneAndDelete({ EMPID: EMPID });
    if (result) {
        console.log(`${EMPID} employee deleted successfully`);
        res.status(201).json({ msg: `${EMPID}  employee  deleted successfully` })

    } else {
        console.log("no employee details found");
    }

})

adminauth.post("/addsalary", async (req, res) => {
    try {
        

        const { EMPID, name, netSalary, month, SalaryDate, Status } = req.body;

        if (!EMPID || !name || !netSalary || !month || !SalaryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSalary = new employeesalary({
            EMPID,
            name,
            netSalary,
            Status: Status || "Paid",
            month,
            SalaryDate,
        });

        await newSalary.save();
        res.status(201).json({ message: "Salary details saved successfully" });

    } catch (error) {
        console.error("Error saving salary details:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



adminauth.get("/salaries", async (req, res) => {
    try {
        const salaries = await employeesalary.find();
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salary records", error });
    }
});


adminauth.get("/salaries/:EMPID", async (req, res) => {
    const EMPID = req.params.EMPID;
    try {
        const salaries = await employeesalary.find({ EMPID });
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salary records", error });
    }
});


adminauth.post("/generatesalary", async (req, res) => {
    const { EMPID } = req.body;
    try {
        const employee = await employee.findOne({ EMPID: EMPID });
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        const leaveThreshold = 3;
        const deductionPerLeave = employee.baseSalary / 30;
        const finalSalary =
            employee.leavesTaken > leaveThreshold
                ? employee.baseSalary - (employee.leavesTaken - leaveThreshold) * deductionPerLeave
                : employee.baseSalary;

        res.json({ EMPID, finalSalary });
    } catch (error) {
        res.status(500).json({ error: "Failed to calculate salary" });
    }
});




adminauth.get("/allleaves", async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leave requests", error });
    }
});


adminauth.put("/updateleave/:EMPID", async (req, res) => {
    const { EMPID } = req.params;
    const { status } = req.body; 

    try {
        const leave = await Leave.findById(EMPID);
        if (!leave) return res.status(404).json({ message: "Leave request not found" });

        leave.status = status;
        await leave.save();

     
        if (status === "Rejected") {
            const employee = await employee.findOne({ EMPID:EMPID });
            if (employee) {
                employee.availableLeaves += Math.ceil(
                    (new Date(leave.toDate) - new Date(leave.fromDate)) /
                    (1000 * 60 * 60 * 24) +
                    1
                );
                await employee.save();
            }
        }

        res.status(200).json({ message: `Leave ${status} successfully` });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave status", error });
    }
});


adminauth.get('/getadmin/:UserName', async (req, res) => {
    const UserName = req.params.UserName
    console.log(UserName);
    const result = await sample.findOne({ UserName: UserName })
    if (result) {
        console.log(result);
        res.status(200).json(result)
    } else {
        res.status(400).json({ message: 'employee details not available' })
    }

})

adminauth.get("/logout", (req, res) => {
    res.clearCookie('payrollToken1');
    res.status(200).json({ msg: "logout successfully" })

})
// adminauth.get('/profile', authenticate, (req, res) => {
//     res.status(200).json({ UserName: req.user, userRole: req.role })
// });


export { adminauth };