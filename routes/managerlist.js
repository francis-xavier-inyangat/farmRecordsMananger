const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

router.get('/', async(req, res) => {
 try{
    const managerDetails = await Manager.find();
    res.render('allmanagers',{users:managerDetails, title: 'Manager Details' } );
   //  alt code
   // res.render('allmanagers',{users:await Manager.find(), title: 'Manager Details' } )
 }
 catch(err){
    console.log(err)
    res.send('Failed to retrieve mamanger Details');
 }
});

// delete mananger
router.post('/delete', async(req, res) => {
   try {
      await Manager.deleteOne({ _id: req.body.id })
      res.redirect('back')
  } catch (err) {
      res.status(400).send("Unable to delete item in the database");
  }

});

// edit manager
router.post('/delete', async(req, res) => {
   try {
      await Manager.updateOne({ _id: req.body.id })
      res.redirect('back')
  } catch (err) {
      res.status(400).send("Unable to update item in the database");
  }

});





module.exports = router;