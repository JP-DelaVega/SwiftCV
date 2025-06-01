import React, { useState, forwardRef, useImperativeHandle, use } from "react";

const CertificationForm = forwardRef(
  ({ certification, handleChange, handleAdd, handleRemove }, ref) => {

    const [errors, setErrors] = useState({});
    useImperativeHandle(ref, () => ({
      validate: () => {
        const newErrors = {};

        certification.forEach((cert, index) => {
          if (!cert.name.trim()) {
            newErrors[`name-${index}`] = "Certification name is required";
          }
          if (!cert.institution.trim()) {
            newErrors[`institution-${index}`] = "Institution is required";
          }
          if (!cert.date.trim()) {
            newErrors[`date-${index}`] = "Date is required";
          }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    return (
      <div className=" bg-gray-100 py-10 flex justify-center px-4 ">
        <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Certification
          </h1>

          {certification.map((cert, index) => (
            <div key={index} className="space-y-6 border-b pb-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={cert.name}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`name-${index}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`name-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`name-${index}`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={cert.institution}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`institution-${index}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`institution-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`institution-${index}`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={cert.date}
                  onChange={(e) => handleChange(e, index)}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                    errors[`date-${index}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`date-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`date-${index}`]}
                  </p>
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
            Add Another Certification
          </button>
        </div>

      </div>
    );
  }
);

export default CertificationForm;
