import mongoose from "mongoose";

const professionalSummarySchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String },
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institution: { type: String, required: true },
  date: { type: String, required: true },
});

const userDetailsSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  personalInformation: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  professionalSummary: [professionalSummarySchema],
  skills: [{ type: String }],
  education: [educationSchema],
  certifications: [certificationSchema],
},{
  timestamps: true,
});

const UserDetails = mongoose.model("userDetails", userDetailsSchema);

export default UserDetails;
