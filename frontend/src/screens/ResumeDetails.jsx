import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import PersonalInformationForms from "../Forms/PersonalInformationsForm";
import ProfessionalSummaryForm from "../Forms/ProfessionalSummaryForm";
import EducationForm from "../Forms/EducationForm";
import CertificationForm from "../Forms/CertificationsForm";
import ResumeList from "./ResumeList";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePersonalInfo,
  updateSkills,
  updateJob,
  addJob,
  removeJob,
  updateEducation,
  addEducation,
  removeEducation,
  updateCertification,
  addCertification,
  removeCertification,
} from "../slices/slice";

const ResumeDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    personalInformation: { firstName: "", lastName: "", email: "", phone: "" },
    professionalSummary: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        summary: "",
      },
    ],
    skills: [],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    certifications: [{ name: "", institution: "", date: "" }],
  });
  const { formData: reduxFormData } = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  const personalRef = useRef();
  const professionalRef = useRef();
  const educationRef = useRef();
  const certificationRef = useRef();

  const validateCurrentStep = async () => {
    let isValid = true;
    if (activeTab === 0 && personalRef.current)
      isValid = await personalRef.current.validate();
    if (activeTab === 1 && professionalRef.current)
      isValid = await professionalRef.current.validate();
    if (activeTab === 2 && educationRef.current)
      isValid = await educationRef.current.validate();
    if (activeTab === 3 && certificationRef.current)
      isValid = await certificationRef.current.validate();
    return isValid;
  };

  const nextTab = async () => {
    const valid = await validateCurrentStep();
    if (valid) setActiveTab((prev) => Math.min(prev + 1, 4));
  };

  const prevTab = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  const handleChangePersonalInformation = (e) => {
    dispatch(
      updatePersonalInfo({ name: e.target.name, value: e.target.value })
    );
  };

  const handleChangeSkills = (e) => {
    const { value } = e.target;
    dispatch(updateSkills(value));
  };

  const handleChangeJob = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateJob({ index, name, value }));
  };

  const handleAddJob = () => {
    dispatch(addJob());
  };

  const handleRemoveJob = (index) => {
    dispatch(removeJob(index));
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateEducation({ index, name, value }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleRemoveEducation = (index) => {
    dispatch(removeEducation(index));
  };

  const handleCertificationChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateCertification({ index, name, value }));
  };

  const handleAddCertification = () => {
    dispatch(addCertification());
  };

  const handleRemoveCertification = (index) => {
    dispatch(removeCertification(index));
  };

  return (
    <>
      
      <Navbar />
      {activeTab === 0 && (
        <PersonalInformationForms
          ref={personalRef}
          formData={reduxFormData}
          handleChangePersonalInformation={handleChangePersonalInformation}
          handleChangeSkills={handleChangeSkills}
        />
      )}
      {activeTab === 1 && (
        <ProfessionalSummaryForm
          ref={professionalRef}
          formData={reduxFormData}
          handleChange={handleChangeJob}
          handleAddJob={handleAddJob}
          handleRemoveJob={handleRemoveJob}
        />
      )}
      {activeTab === 2 && (
        <EducationForm
          ref={educationRef}
          education={reduxFormData.education}
          handleChange={handleEducationChange}
          handleAdd={handleAddEducation}
          handleRemove={handleRemoveEducation}
        />
      )}
      {activeTab === 3 && (
        <CertificationForm
          ref={certificationRef}
          certification={reduxFormData.certifications}
          handleChange={handleCertificationChange}
          handleAdd={handleAddCertification}
          handleRemove={handleRemoveCertification}
        />
      )}
      {activeTab === 4 && <ResumeList formData={formData} />}

      <div className="flex justify-center mb-4">
        <div className="flex justify-between bg-gray-100 w-full max-w-4xl">
          <button
            onClick={prevTab}
            disabled={activeTab <= 0}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={nextTab}
            disabled={activeTab >= 4}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ResumeDetails;
