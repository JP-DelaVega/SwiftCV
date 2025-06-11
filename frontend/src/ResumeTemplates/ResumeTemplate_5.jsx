// src/screens/ResumeTemplate_5.jsx

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

function ResumeTemplate_5() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(
    userInfo._id
  );
  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  return (
    <div className="bg-white min-h-screen py-8 px-6 flex justify-center">
      <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{`${data?.data?.personalInformation.firstName} ${data?.data?.personalInformation.lastName}`}</h1>
          </div>
          {/*<img 
            src="https://via.placeholder.com/120" 
            alt="Profile" 
            className="rounded-full w-24 h-24 border-4 border-gray-300"
          />*/}
        </div>

        {/* Contact Info Section */}
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Contact Info
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-gray-400" />
              <span>{`${data?.data?.personalInformation.phone}`}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <span>{`${data?.data?.personalInformation.email}`}</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <a
              href="https://github.com/johndoe"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-1 bg-gray-200"></div>

        {/* Section Divider */}
        <div className="h-1 bg-gray-200"></div>

        {/* Work Experience */}
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Work Experience
          </h2>

          {data?.data?.professionalSummary.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {job.jobTitle}
              </h3>
              <p className="text-sm text-gray-500">
                {job.company} | {job.startDate} - {job.endDate}
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                <li>{job.description}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="h-1 bg-gray-200"></div>

        {/* Education */}
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Education
          </h2>
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

        {/* Section Divider */}
        <div className="h-1 bg-gray-200"></div>

        {/* Skills */}
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
            {data?.data?.skills.map((skill) => (
              <span key={skill} className="bg-gray-200 rounded-full px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-1 bg-gray-200"></div>

        {/* Certifications */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
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

export default ResumeTemplate_5;
