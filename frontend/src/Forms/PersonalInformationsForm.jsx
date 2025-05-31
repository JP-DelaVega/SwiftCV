import React, { useState, forwardRef, useImperativeHandle ,useEffect} from "react";
import { toast } from "react-toastify";
const PersonalInformationForms = forwardRef(
  ({ handleChangeSkills, handleChangePersonalInformation, formData }, ref) => {
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    // Error state for individual fields
    const [errors, setErrors] = useState({});
    const notify = () => {
      toast.error("Please enter a skill before adding.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
    useEffect(() => {
      if (formData.skills) {
        setSkills(formData.skills);
      }
    }, [formData.skills]);
    useImperativeHandle(ref, () => ({
      validate: () => {
        const newErrors = {};
        const data = formData.personalInformation;
        const skillsData = formData.skills || [];
        if (!data.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!data.email.trim()) newErrors.email = "Email is required";
        if (!data.phone.trim()) newErrors.phone = "Phone number is required";
        if (skillsData.length === 0)
          newErrors.skills = "At least one skill is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    const addSkill = () => {
      if (!skillInput.trim()) {
        notify();
        return;
      }
      const trimmed = skillInput.trim();
      if (!trimmed) return;
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      handleChangeSkills({ target: { name: "skills", value: newSkills } });
      setSkillInput("");
    };

    const removeSkill = (index) => {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
      handleChangeSkills({ target: { name: "skills", value: newSkills } });
    };

    return (
      <div className="mt-15 bg-gray-100 py-10 flex justify-center px-4">
        <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Personal Information
          </h1>

          {/* Input fields */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.personalInformation.firstName}
                onChange={handleChangePersonalInformation}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.personalInformation.lastName}
                onChange={handleChangePersonalInformation}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.personalInformation.email}
                onChange={handleChangePersonalInformation}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.personalInformation.phone}
                onChange={handleChangePersonalInformation}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          {/*separator line*/}
          <hr className="my-6 border-t border-gray-300" />

          {/* Skills Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div
              className={`flex flex-wrap gap-2 ${
                skills.length > 0 ? "mt-2" : ""
              }`}
            >
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(idx)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="flex mt-3 space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />

              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default PersonalInformationForms;
