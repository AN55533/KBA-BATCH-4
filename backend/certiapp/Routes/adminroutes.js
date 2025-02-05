import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../Middleware/auth.js"


dotenv.config();
const adminRoute = Router();
const user = new Map();
const courses = new Map();

adminRoute.get('/', (req, res) => {
    res.send("Hello World");
})

adminRoute.post('/signup', async (req, res) => {
    try {

        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        console.log(FirstName);


        if (user.get(UserName)) {
            res.status(400).send("Username already exist");
        }
        else {
            const newPassword = await bcrypt.hash(Password, 10);
            console.log(newPassword);
            user.set(UserName, { FirstName, LastName, Password: newPassword, UserRole });
            res.status(201).send("Signed-up successfully")
            console.log(user.get(UserName));
        }
    }


    catch {
        res.status(500).send("Internal Server error");
    }
  
})


adminRoute.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        const result = user.get(UserName);
        if (!result) {
            res.status(400).send("Enter a valid username");
        }
        else {
            console.log(result.Password);
            const valid = await bcrypt.compare(Password, result.Password);
            console.log(valid);
            if (valid) {
                const token = jwt.sign({ UserName: UserName, UserRole: result.UserRole }, process.env.SecretKey, { expiresIn: '1h' });
                console.log(token);
                res.cookie('authToken1', token,
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

adminRoute.post("/issuecertificate", authenticate, (req, res) => {
    try {

        const { Coursename, Certificateid, Candidatename, SelectGrade, IssueDate } = req.body;
        if (courses.get(Coursename)) {
            res.status(400).json({ msg: "Course name already exist" });
        }
        else {
            courses.set(Coursename, { Certificateid, Candidatename, SelectGrade, IssueDate });
            console.log(courses.get(Coursename));
            res.status(201).json({ msg: `${Coursename} stored successfully` })
        }
    }
    catch {
        res.status(500).send("Internal Server error");
    }

})

adminRoute.get('/viewcertificate/:Coursename', (req, res) => {
    const coursename = req.params.Coursename
    console.log(coursename);
    if (courses.get(coursename)) {
        console.log(courses.get(coursename));
        res.status(200).json("view course details ")
    } else {
        res.status(400).json({ message: 'Course not available' })
    }

})


export { adminRoute };


