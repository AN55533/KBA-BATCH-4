import React from 'react'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Addemployee from './pages/Addemployee'
import Empdetails from "./pages/Viewemployee";
import Editempdetails from "./pages/Editemployee";
import Generatesalary from "./pages/Generatesalary";
import Leaveapplication from './pages/LeaveApplication'
import Home1 from './pages/Home1'
import Userlogin from './pages/Userlogin'
import UserDashboard from './pages/Userdashboard'
import Viewleaverequest from './pages/Viewleaverequest'
import Viewsalarydetails from './pages/Viewsalarydetails'
import Profile from './pages/Profile'
import SalaryRecords from './pages/SalaryRecords'
import Userprofile from './pages/Userprofile'
import Usereditprofile from './pages/Usereditprofile'
import Employeesalaryrecords from './pages/Employeesalaryrecords'



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addemployee" element={<Addemployee />} />
        <Route path="/getemployee" element={<Empdetails />} />
        <Route path="/editemployee/:EMPID" element={<Editempdetails />} />
        <Route path="/generatesalary" element={<Generatesalary />} />
        <Route path="/leaveapplication/:EMPID" element={<Leaveapplication />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/viewleaverequest" element={<Viewleaverequest />} />
        <Route path="/viewsalary" element={<Viewsalarydetails />} />
        <Route path="/profile/:EMPID" element={<Profile />} />
        <Route path="/logout" element={<Home1 />} />
        {/* <Route path="/logoutemp" element={<UserDashboard />} /> */}
        <Route path="/salaryrecords" element={<SalaryRecords />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/usereditprofile" element={<Usereditprofile />} />
        <Route
          path="/employeesalaryrecords"
          element={<Employeesalaryrecords />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App