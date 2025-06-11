// src/screens/ResumeTemplate2.jsx

import "../styles/resume-color.css";
import { formatDate } from "../utils/date.js";
import { useSelector } from "react-redux";
import { useGetUserDetailsByUserIdQuery } from "../slices/userDetailsSlice.js";
function ResumeTemplate_2() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(userInfo._id);
   if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex justify-center">
      <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
        {/* Left Side */}
        <div className="bg-gray-800 text-white p-6 md:col-span-1 flex flex-col justify-between">
          {/* Profile */}
          <div>
            <h1 className="text-3xl font-bold">{`${data?.data?.personalInformation.firstName} ${data?.data?.personalInformation.lastName}`}</h1>

            {/* Contact Info */}
            <div className="mt-6 text-sm space-y-2">
              <p>{`Email: ${data?.data?.personalInformation.email}`}</p>
              <p>{`Phone: ${data?.data?.personalInformation.phone}`}</p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold border-b border-gray-600 pb-1 mb-4">
                Skills
              </h2>
              <ul className="flex flex-wrap gap-2 text-sm text-gray-300">
                {data?.data?.skills.map((skill) => (
                  <li key={skill}>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm inline-block">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold border-b border-gray-600 pb-1 mb-4">
                Certifications
              </h2>
              <ul className="space-y-1 text-sm text-gray-300">
                {data?.data?.certifications.map((cert, index) => (
                  <li key={index}>
                    <strong>{cert.name}</strong> - {cert.institution} |{" "}
                    {cert.date}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-10">&copy; 2025 John Doe</p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:col-span-2">
          {/* Work Experience */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Work Experience
            </h2>
            {data?.data?.professionalSummary.map((job, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-bold text-gray-700">
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
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Education
            </h2>
            <div>
              {data?.data?.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-gray-700">
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
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate_2;
