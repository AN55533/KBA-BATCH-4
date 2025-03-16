import React from 'react'
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Dashboard from './Dashboard';



const Home = () => {
  return (
    <>
      <Hero />
      <Navbar />
      <Dashboard/>
     
    </>
  );
}

export default Home
