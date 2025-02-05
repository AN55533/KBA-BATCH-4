import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminauth.js";
// import adminCheck from "../Middleware/adminauth.js";

const adminauth = Router();
const course = new Map();

adminauth.post("/addCourse", authenticate, (req, res) => {
    try {

        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        if (course.get(CourseName)) {
            res.status(400).json({ msg: "Course name already exist" });
        }
        else {
            course.set(CourseName, { CourseId, CourseType, Description, Price });
            console.log(course.get(CourseName));
            res.status(201).json({ msg: `${CourseName} stored successfully` })
            
        }
        

    }
    catch {
        res.status(500).send("Internal Server error");
    }

})

adminauth.get('/getcourse/:Coursename', (req, res) => {
    const coursename = req.params.Coursename
    console.log(coursename);
    if (course.get(coursename)) {
        console.log(course.get(coursename));
        res.status(200).json("view course details ")
    } else {
        res.status(400).json({ message: 'Course not available' })
    }

})
adminauth.put('/updatecourse', authenticate, (req, res) => {
    
    if (req.role == 'admin') {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        if (course.get(CourseName)) {
            course.set(CourseName, { CourseId, CourseType, Description, Price });
            console.log(course.get(CourseName));
            res.status(201).json({ msg: `${CourseName} updated successfully` })
           
        }
        else {
            res.status(400).json({ msg: "Course name already updated" });
          
        }


    }
})
    adminauth.patch('/editcourse', authenticate, (req, res) => {
       
            const { CourseName,CourseType,Price } = req.body;
        console.log(CourseType);
        const result = course.get(CourseName)
        console.log(result);
        if (result) {
            course.set(CourseName, { CourseId: result.CourseId }, CourseType, { Description: result.Description }, Price)
            res.status(200).json("course edited susccessfully");
        } else {
            
            res.status(400).json("course not founded")
                
            
        }

        
    })
adminauth.delete("/deletecourse/:CourseName",authenticate, adminCheck ,(req, res) => {
    const coursename = req.params.CourseName;
    if (course.get(coursename)) {
        console.log(`${coursename} course deleted successfully`);
        res.status(201).json({ msg: `${coursename}  course deleted successfully` })

    } else {
        console.log("no course details found");
    }
     
    })


export { adminauth };