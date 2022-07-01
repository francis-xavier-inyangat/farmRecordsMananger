const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const Manager = require('../models/Manager');


router.get('/', (req, res) => {
  res.render('farm_manager_register');
});

router.post('/', async(req, res) => {
    const manager = new Manager(req.body);
    await Manager.register(manager, req.body.password, (err) => {
        if (err) {
            // if there are errors, remain on reg page
            res.status(400).render('farm_manager_register', {
                title: 'users'
            })
            console.log(err)
        } else {
            // redirect to login page when register is ok
            res.redirect('/login')
        }
    })

})





module.exports = router;










