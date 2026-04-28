const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  study_hours_weekly: Number,
  attendance_pct: Number,
  previous_cgpa: Number,
  sleep_hours: Number,
  mental_health_score: Number,
  has_part_time_job: Number,
  extracurricular: String,
  department: String,
  semester: Number
}, { _id: false });

const predictionSchema = new mongoose.Schema({
  predicted_score: Number,
  predicted_grade: String,
  grade_confidence: Number,
  grade_distribution: {
    A: Number,
    "A+": Number,
    B: Number,
    "B+": Number,
    C: Number,
    D: Number,
    F: Number
  },
  at_risk: Boolean,
  risk_probability: Number
}, { _id: false });

const insightSchema = new mongoose.Schema({
  weak_areas: [{
    area: String,
    current: Number,
    recommended: Number,
    overall_avg: Number,
    message: String
  }],
  study_recommendation: {
    current_hours: Number,
    recommended_hoursapp: Number,
    simulations: [{
      hours: Number,
      predicted_score: Number
    }],
    potential_improvement: Number,
    message: String
  },
  strengths: [String],
  risk_factors: [String],
  field_suggestions: [{
    field: String,
    match: String,
    reason: String
  }]
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },

  input_data: inputSchema,

  result: {
    success: Boolean,
    predictions: predictionSchema,
    insights: insightSchema
  },
  password:{
    type:String, 
    required:true
  }

}, { timestamps: true });

module.exports =  mongoose.model("Student", studentSchema);