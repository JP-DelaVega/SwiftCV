import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProfessionalSummaryForm = forwardRef(
  ({ handleChange, formData, handleAddJob, handleRemoveJob }, ref) => {
    const jobs = formData.professionalSummary;
    const [errors, setErrors] = useState({});

    useImperativeHandle(ref, () => ({
      validate: () => {
        const newErrors = {};

        jobs.forEach((job, index) => {
          if (!job.jobTitle.trim()) {
            newErrors[`jobTitle-${index}`] = "Job title is required";
          }
          if (!job.company.trim()) {
            newErrors[`company-${index}`] = "Company is required";
          }
          if (!job.startDate.trim()) {
            newErrors[`startDate-${index}`] = "Start date is required";
          }
          if (!job.endDate.trim()) {
            newErrors[`endDate-${index}`] = "End date is required";
          }
          if (!job.description.trim()) {
            newErrors[`description-${index}`] = "Description is required";
          }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <>
        <div className="mt-15 bg-gray-100 py-10 flex justify-center px-4">
          <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Professional Summary
            </h1>

            {jobs.map((job, index) => (
              <div key={index} className="space-y-6 border-b pb-6 mb-6">
                <div>
                  <label
                    htmlFor={`jobTitle-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id={`jobTitle-${index}`}
                    name="jobTitle"
                    value={job.jobTitle}
                    onChange={(e) => handleChange(e, index)}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors[`jobTitle-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`jobTitle-${index}`] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[`jobTitle-${index}`]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`company-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id={`company-${index}`}
                    name="company"
                    value={job.company}
                    onChange={(e) => handleChange(e, index)}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors[`company-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`company-${index}`] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[`company-${index}`]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`startDate-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`startDate-${index}`}
                    name="startDate"
                    value={job.startDate}
                    onChange={(e) => handleChange(e, index)}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors[`startDate-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`startDate-${index}`] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[`startDate-${index}`]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`endDate-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`endDate-${index}`}
                    name="endDate"
                    value={job.endDate}
                    onChange={(e) => handleChange(e, index)}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors[`endDate-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`endDate-${index}`] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[`endDate-${index}`]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`description-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description
                  </label>
                  <textarea
                    id={`description-${index}`}
                    name="description"
                    value={job.description}
                    onChange={(e) => handleChange(e, index)}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors[`description-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    rows="4"
                  />
                  {errors[`description-${index}`] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[`description-${index}`]}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveJob(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove Job
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddJob}
              className="mt-6 text-blue-600 hover:text-blue-800"
            >
              Add Another Job
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default ProfessionalSummaryForm;
