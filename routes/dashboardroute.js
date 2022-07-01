const express = require('express');
const passport = require('passport');
const router = express.Router();

const mongoose = require('mongoose');
const Manager = require('../models/Manager');



router.get('/', (req, res) => {
  res.render('dashboard',{title: 'Manager Dashboard'});
});




module.exports = router;