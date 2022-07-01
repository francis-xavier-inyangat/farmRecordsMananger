const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const Manager = require('../models/Manager');

router.get('/', async(req, res) => {
 try{
    const managerDetails = await Manager.find();
    res.render('allmanagers',{users:managerDetails, title: 'Manager Details' } )
 }
 catch(err){
    console.log(err)
    res.send('Failed to retrieve mamanger Details');
 }
});




module.exports = router;