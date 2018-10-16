const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataEmployees = new Schema(
  {
    name: String,
    lastName: String,
    patronymic: String,
    sex: String,
    salary: Number,
    departments: Array,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Employees', DataEmployees);
