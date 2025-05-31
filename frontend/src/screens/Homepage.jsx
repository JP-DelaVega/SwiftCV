import React from "react";
import resume from "../assets/resume.png";
import { Link } from "react-router-dom";
function Homepage() {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-24 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Create Your Professional Resume
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        Easily build your resume with beautiful templates and customize it to
        stand out — all in just a few clicks.
      </p>

      {/* Wider Image */}
      <img
        src={resume}
        alt="Resume Preview"
        className="w-full max-w-4xl h-auto mb-12 shadow-lg rounded-xl"
      />

      {/* Less Rounded Button */}

      <Link
        to="/ResumeDetails"
        className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        Get Started
      </Link>
      
    </div>
  );
}

export default Homepage;
