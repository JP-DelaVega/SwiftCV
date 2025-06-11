// src/screens/ResumeTemplate_7.jsx

import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/date.js";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useGetUserDetailsByUserIdQuery } from "../slices/userDetailsSlice.js";

function ResumeTemplate_7() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(
    userInfo._id
  );
  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  return (
    <div className=" min-h-screen flex justify-center py-16 px-4">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Image commented out */}
          {/* <img 
            src="https://via.placeholder.com/120" 
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-blue-500"
          /> */}

          <h1 className="text-3xl font-semibold text-gray-800 mb-2">{`${data?.data?.personalInformation.firstName} ${data?.data?.personalInformation.lastName}`}</h1>

          {/* GitHub and LinkedIn icons under name */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/johndoe"
              className="text-blue-500 hover:text-blue-400"
            >
              <FaGithub size={25} />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-blue-500 hover:text-blue-400"
            >
              <FaLinkedin size={25} />
            </a>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Info
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-500" />
              {`${data?.data?.personalInformation.phone}`}
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              {`${data?.data?.personalInformation.email}`}
            </li>
          </ul>
        </div>
        {/* Skills */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {data?.data?.skills.map((skill) => (
              <span key={skill} className="bg-gray-200 rounded-full px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* Work Experience Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Work Experience
          </h2>
          <div className="space-y-6">
            {data?.data?.professionalSummary.map((job, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">
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
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Education
          </h2>
          {data?.data?.education.map((edu, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800">
                {edu.degree}
              </h3>
              <p className="text-sm text-gray-500">
                {edu.institution} | Graduated: {formatDate(edu.startDate)} -{" "}
                {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {data?.data?.certifications.map((cert, index) => (
              <li key={index}>
                <strong>{cert.name}</strong> - {cert.institution} | {cert.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate_7;
