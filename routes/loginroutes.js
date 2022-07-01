const express = require('express');
const passport = require('passport');
const router = express.Router();

const mongoose = require('mongoose');
const Manager = require('../models/Manager');



router.get('/', (req, res) => {
  res.render('farm_manager_login',{title: 'Farm Manager Login'});
});

router.post('/', passport.authenticate('local',{failureRedirect:'/login'}), 
(req,res)=>{
    req.session.user = req.user
    // take user to dashborad on successful login
    res.redirect('/dashboard')
});

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})




module.exports = router;