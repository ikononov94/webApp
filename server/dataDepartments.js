const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataDepartments = new Schema(
  {
    departmentName: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Departments', DataDepartments);
