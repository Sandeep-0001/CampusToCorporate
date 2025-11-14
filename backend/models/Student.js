const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leetcodeUsername: { type: String, required: true, unique: true },
  universityId: { type: String },
  email: { type: String },
  department: { type: String },
  batch: { type: String },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
  contestRating: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

studentSchema.virtual('totalSolved').get(function () {
  return (this.easySolved || 0) + (this.mediumSolved || 0) + (this.hardSolved || 0);
});

module.exports = mongoose.model('Student', studentSchema);
