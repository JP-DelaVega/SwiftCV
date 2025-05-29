// src/screens/ResumeTemplate_3.jsx

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

function ResumeTemplate_3() {
  const { formData: reduxFormData } = useSelector((state) => state.resume);
  return (
    <div className="bg-gray-50 min-h-[160vh] py-10 px-8 flex justify-center">
      <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-12 flex flex-col md:flex-row">
        {/* Left Section (Contact Info) */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg mb-8 md:mb-0">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">{`${reduxFormData.personalInformation.firstName} ${reduxFormData.personalInformation.lastName}`}</h1>
          </div>

          <div className="flex flex-col items-center text-gray-600 space-y-4">
            <div className="flex items-center text-sm">
              <FaPhoneAlt className="mr-2 text-gray-500" />
              <span>{`${reduxFormData.personalInformation.phone}`}</span>
            </div>
            <div className="flex items-center text-sm">
              <FaEnvelope className="mr-2 text-gray-500" />
              <span>{`${reduxFormData.personalInformation.email}`}</span>
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/johndoe"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/johndoe"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section (Main Content) */}
        <div className="w-full md:w-2/3 md:pl-10">
          {/* Work Experience */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Work Experience
            </h2>
            {reduxFormData.professionalSummary.map((job, index) => (
              <div key={index} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-500 text-sm">
                  {job.company} | {job.startDate} - {job.endDate}
                </p>
                <p className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                  {job.description}
                </p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-10">
            {reduxFormData.education.map((edu, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  {edu.degree}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800">
                  {edu.institution} | Graduated: {formatDate(edu.startDate)} -{" "}
                  {formatDate(edu.endDate)}
                </h3>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
              {reduxFormData.skills.map((skill) => (
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {reduxFormData.certifications.map((cert, index) => (
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

export default ResumeTemplate_3;
