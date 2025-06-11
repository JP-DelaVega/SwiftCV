// src/screens/ResumeTemplate_6.jsx

import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/date.js";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { useGetUserDetailsByUserIdQuery } from "../slices/userDetailsSlice.js";

function ResumeTemplate_6() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(
    userInfo._id
  );
  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  return (
    <div className=" min-h-screen flex justify-center py-10">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="bg-blue-800 text-white w-full md:w-1/3 py-10 px-6 flex flex-col items-center">
          {/*<img 
            src="https://via.placeholder.com/120" 
            alt="Profile" 
            className="rounded-full w-32 h-32 border-4 border-white mb-6"
          />*/}
          <h1 className="text-3xl font-semibold mb-2">{`${data?.data?.personalInformation.firstName} ${data?.data?.personalInformation.lastName}`}</h1>

          {/* Contact Info */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Contact</h2>
            <ul className="text-sm space-y-2 mt-4">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                {`${data?.data?.personalInformation.phone}`}
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                {`${data?.data?.personalInformation.email}`}
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com/johndoe"
              className="text-white hover:text-gray-200"
            >
              <FaGithub size={25} />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-white hover:text-gray-200"
            >
              <FaLinkedin size={25} />
            </a>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-2/3 p-6">
          {/* Work Experience */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBriefcase className="mr-2 text-blue-800" />
              Work Experience
            </h2>
            {data?.data?.professionalSummary.map((job, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.jobTitle}
                </h3>
                <p className="text-sm text-gray-500">
                  {job.company} | {job.startDate} - {job.endDate}
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>{job.description}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaGraduationCap className="mr-2 text-blue-800" />
              Education
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg">
              {data?.data?.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {edu.institution} | Graduated: {formatDate(edu.startDate)} -{" "}
                    {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {data?.data?.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              {data?.data?.certifications.map((cert, index) => (
                <li key={index}>
                  <strong>{cert.name}</strong> - {cert.institution} |{" "}
                  {cert.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate_6;
