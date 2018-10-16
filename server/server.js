const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Employees = require('./dataEmployees');
const Departments = require('./dataDepartments');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://webappUser:123321098890A@ds251727.mlab.com:51727/webapp';

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getEmployees', (req, res) => {
  Employees.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

router.get('/getDepartments', (req, res) => {
  Departments.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

router.post('/updateEmployees', (req, res) => {
  const { id, update } = req.body;

  Employees.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateDepartments', (req, res) => {
  const { id, update } = req.body;

  Departments.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteEmployees', (req, res) => {
  const { id } = req.body;

  Employees.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteDepartments', (req, res) => {
  const { id } = req.body;

  Departments.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/putEmployees', (req, res) => {
  const data = new Employees();

  const {
    name, lastName, patronymic, sex, salary, departments,
  } = req.body;

  if (!name || !lastName || !departments.length) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.name = name;
  data.lastName = lastName;
  data.patronymic = patronymic || '';
  data.sex = sex || '';
  data.salary = salary || null;
  data.departments = departments;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });

  return null;
});

router.post('/putDepartments', (req, res) => {
  const data = new Departments();

  const { departmentName } = req.body;

  if (!departmentName) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.departmentName = departmentName;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });

  return null;
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
