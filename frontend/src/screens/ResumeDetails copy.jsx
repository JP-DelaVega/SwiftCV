import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import PersonalInformationForms from "../Forms/PersonalInformationsForm";
import ProfessionalSummaryForm from "../Forms/ProfessionalSummaryForm";
import EducationForm from "../Forms/EducationForm";
import CertificationForm from "../Forms/CertificationsForm";
import ResumeList from "./ResumeList";
import {useSelector, useDispatch} from 'react-redux'
import { updatePersonalInfo,
  updateSkills,
  updateJob,
  addJob,
  removeJob,
  updateEducation,
  addEducation,
  removeEducation,
  updateCertification,
  addCertification,
  removeCertification} from '../slices/slice'

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
  const {formData: reduxFormData} = useSelector((state) => state.resume)
  const dispatch = useDispatch()
  const handleChangePersonalInformation = (e) => {
    dispatch(updatePersonalInfo({name: e.target.name, value: e.target.value}))
  }

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

  const handleChangePersonalInformation2 = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInformation: { ...prev.personalInformation, [name]: value },
    }));
  };
  console.log(reduxFormData)

  const handleChangeSkills = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: value, // ✅ `value` is already the updated array from the child
    }));
  };
  
  const handleChangeJob = (e, index) => {
    const { name, value } = e.target;
    const newJobs = [...formData.professionalSummary];
    newJobs[index][name] = value;
    setFormData((prev) => ({ ...prev, professionalSummary: newJobs }));
  };

  const handleAddJob = () => {
    setFormData((prev) => ({
      ...prev,
      professionalSummary: [
        ...prev.professionalSummary,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          summary: "",
        },
      ],
    }));
  };

  const handleRemoveJob = (index) => {
    const newJobs = formData.professionalSummary.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, professionalSummary: newJobs }));
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleCertificationChange = (e, index) => {
    const { name, value } = e.target;
    const newCert = [...formData.certifications];
    newCert[index][name] = value;
    setFormData((prev) => ({ ...prev, certifications: newCert }));
  };

  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", institution: "", date: "" },
      ],
    }));
  };

  const handleRemoveCertification = (index) => {
    const newCert = formData.certifications.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, certifications: newCert }));
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
          formData={formData}
          handleChange={handleChangeJob}
          handleAddJob={handleAddJob}
          handleRemoveJob={handleRemoveJob}
        />
      )}
      {activeTab === 2 && (
        <EducationForm
          ref={educationRef}
          education={formData.education}
          handleChange={handleEducationChange}
          handleAdd={handleAddEducation}
          handleRemove={handleRemoveEducation}
        />
      )}
      {activeTab === 3 && (
        <CertificationForm
          ref={certificationRef}
          certification={formData.certifications}
          handleChange={handleCertificationChange}
          handleAdd={handleAddCertification}
          handleRemove={handleRemoveCertification}
        />
      )}
      {
        activeTab === 4 && <ResumeList formData={formData} />
      }

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
