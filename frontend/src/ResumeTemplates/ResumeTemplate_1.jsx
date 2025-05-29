// src/screens/ResumeTemplate.jsx
import React from "react";
import '../styles/resume-color.css';
import { useSelector } from "react-redux";
import {formatDate} from "../utils/date.js";
function ResumeTemplate() {
  const { formData: reduxFormData } = useSelector((state) => state.resume);
  return (
    <div className="min-h-screen py-10 flex justify-center px-4">
      <div className="max-w-4xl w-full shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{`${reduxFormData.personalInformation.firstName} ${reduxFormData.personalInformation.lastName}`}</h1>
          <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
            <p>{`Email: ${reduxFormData.personalInformation.email}`}</p>
            <p>|</p>
            <p>{`Phone: ${reduxFormData.personalInformation.phone}`}</p>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {reduxFormData.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Work Experience
          </h2>
          {reduxFormData.professionalSummary.map((job, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {job.jobTitle}
              </h3>
              <p className="text-gray-500">
                {job.company} | {job.startDate} - {job.endDate}
              </p>
                <p className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  {job.description}
                </p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Education
          </h2>
          {reduxFormData.education.map((edu, index) => (
            <div key={index}>
            <h3  className="text-lg font-semibold text-gray-800">
              {edu.degree}
            </h3>
            <p className="text-gray-500">{edu.institution} | Graduated: {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
          </div>
            ))}
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {reduxFormData.certifications.map((cert, index) => (
              <li key={index} className="mb-2">
                <strong>{cert.name}</strong> - {cert.institution} | {cert.date}
              </li>
            ))}
          </ul>
        </section>
      </div>
      
    </div>
  );
}

export default ResumeTemplate;
