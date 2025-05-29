import React, { useState, forwardRef, useImperativeHandle } from "react";

const EducationForm = forwardRef(
  ({ education, handleChange, handleAdd, handleRemove }, ref) => {
    const [errors, setErrors] = useState({});

    useImperativeHandle(ref, () => ({
      validate: () => {
        const newErrors = {};
        education.forEach((edu, index) => {
          if (!edu.degree.trim()) {
            newErrors[`degree-${index}`] = "Degree is required";
          }
          if (!edu.institution.trim()) {
            newErrors[`institution-${index}`] = "Institution is required";
          }
          if (!edu.startDate.trim()) {
            newErrors[`startDate-${index}`] = "Start date is required";
          }
          if (!edu.endDate.trim()) {
            newErrors[`endDate-${index}`] = "End date is required";
          }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <div className="mt-15 bg-gray-100 py-10 flex justify-center px-4">
        <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Education
          </h1>

          {education.map((edu, index) => (
            <div key={index} className="space-y-6 border-b pb-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`degree-${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[`degree-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`degree-${index}`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`institution-${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[`institution-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`institution-${index}`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`startDate-${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[`startDate-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`startDate-${index}`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={edu.endDate}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`endDate-${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[`endDate-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`endDate-${index}`]}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="mt-6 text-blue-600 hover:text-blue-800"
          >
            Add Another Education
          </button>
        </div>
      </div>
    );
  }
);

export default EducationForm;
