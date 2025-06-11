// src/screens/ResumeTemplate_4.jsx

import { useSelector } from "react-redux";
import { formatDate } from "../utils/date.js";
import "../styles/resume-color.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useGetUserDetailsByUserIdQuery } from "../slices/userDetailsSlice.js";

function ResumeTemplate_4() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(
    userInfo._id
  );
  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  return (
    <div className=" min-h-screen flex justify-center py-12">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-lg">
        {/* Sidebar */}
        <div className="w-2/5 bg-gray-800 text-white p-8 flex flex-col items-center">
          {/* <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            className="rounded-full w-36 h-36 mb-6 border-4 border-white"
          />*/}
          <h1 className="text-2xl font-semibold text-center mb-4">{`${data?.data?.personalInformation.firstName} ${data?.data?.personalInformation.lastName}`}</h1>

          <div className="flex flex-col text-sm space-y-4">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-gray-400" />
              <span>{`Phone: ${data?.data?.personalInformation.phone}`}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <span>{`Email: ${data?.data?.personalInformation.email}`}</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <a
              href="https://github.com/johndoe"
              className="text-gray-400 hover:text-white"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/5 p-8 space-y-10">
          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Work Experience
            </h2>
            {data?.data?.professionalSummary.map((job, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-500 text-sm">
                  {job.company} | {job.startDate} - {job.endDate}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                  <li>{job.description}</li>
                </ul>
              </div>
            ))}
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Education
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              {data?.data?.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-1xl font-semibold text-gray-800 mb-4">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {edu.institution} | Graduated: {formatDate(edu.startDate)} -{" "}
                    {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
              {data?.data?.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {data?.data?.certifications.map((cert, index) => (
                <li key={index}>
                  <strong>{cert.name}</strong> - {cert.institution} |{" "}
                  {cert.date}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate_4;
