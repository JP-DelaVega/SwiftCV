import "../styles/resume-color.css";
import { useSelector } from "react-redux";
import {memo} from "react";
import { formatDate } from "../utils/date.js";
import { useGetUserDetailsByUserIdQuery } from "../slices/userDetailsSlice.js";
function ResumeTemplate() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetUserDetailsByUserIdQuery(userInfo._id);

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details: {error.message}</p>;
console.log("UserDetails data:", data);
  return (
    <div className="min-h-screen py-10 flex justify-center px-4">
      <div className="max-w-4xl w-full shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{`${data?.data?.personalInformation?.firstName} ${data?.data?.personalInformation.lastName}`}</h1>
          <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
            <p>{`Email: ${data?.data?.personalInformation.email}`}</p>
            <p>|</p>
            <p>{`Phone: ${data?.data?.personalInformation.phone}`}</p>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data?.data?.skills.map((skill) => (
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
          {data?.data?.professionalSummary.map((job, index) => (
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
          {data?.data?.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800">
                {edu.degree}
              </h3>
              <p className="text-gray-500">
                {edu.institution} | Graduated: {formatDate(edu.startDate)} -{" "}
                {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {data?.data?.certifications.map((cert, index) => (
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

export default memo(ResumeTemplate);
