import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  formData: {
    personalInformation: { firstName: "", lastName: "", email: "", phone: "" },
    professionalSummary: [
      { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
    ],
    skills: [],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    certifications: [{ name: "", institution: "", date: "" }],
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      const { name, value } = action.payload;
      state.formData.personalInformation[name] = value;
    },
    updateSkills: (state, action) => {
      state.formData.skills = action.payload;
    },

    updateJob: (state, action) => {
      const { index, name, value } = action.payload;
      state.formData.professionalSummary[index][name] = value;
    },
    addJob: (state) => {
      state.formData.professionalSummary.push({
        jobTitle: "", company: "", startDate: "", endDate: "", description: "",
      });
    },
    removeJob: (state, action) => {
      state.formData.professionalSummary.splice(action.payload, 1);
    },

    updateEducation: (state, action) => {
      const { index, name, value } = action.payload;
      state.formData.education[index][name] = value;
    },
    addEducation: (state) => {
      state.formData.education.push({
        degree: "", institution: "", startDate: "", endDate: "",
      });
    },
    removeEducation: (state, action) => {
      state.formData.education.splice(action.payload, 1);
    },

    updateCertification: (state, action) => {
      const { index, name, value } = action.payload;
      state.formData.certifications[index][name] = value;
    },
    addCertification: (state) => {
      state.formData.certifications.push({
        name: "", institution: "", date: "",
      });
    },
    removeCertification: (state, action) => {
      state.formData.certifications.splice(action.payload, 1);
    },
  },
  
});



export const {
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
} = resumeSlice.actions;

export default resumeSlice.reducer;
