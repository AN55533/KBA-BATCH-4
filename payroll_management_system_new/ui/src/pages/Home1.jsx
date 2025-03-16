import React from "react";
import { Link } from "react-router-dom";
import payImage from "../assets/images/payroll2.jpg";

const Home1 = () => {
  return (
    <div>
      <div className="bg-blue-400  text-white py-16 rounded-lg flex flex-col items-center justify-center text-center shadow-lg">
        <h1 className="font-extrabold text-3xl md:text-5xl ">
          PAYROLL MANAGEMENT SYSTEM
        </h1>

        <nav className="mt-6">
          <ul className="flex space-x-10 text-lg font-bold  ">
            <li>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-800 transition duration-300 px-6 py-2 rounded-lg shadow-md text-white"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                to="/userlogin"
                className="bg-purple-600 hover:bg-purple-800 transition duration-300 px-6 py-2 rounded-lg shadow-md text-white"
              >
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
        style={{ backgroundImage: `url(${payImage})` }}
      >     
      </section>
    </div>
  );
};

export default Home1;
