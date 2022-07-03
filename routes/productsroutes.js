const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res) => {
  res.render('productsales');
});


// post pdts to DB to 
router.post('/', async(req,res)=>{
  try{
      const product = new Product(req.body);
      await product.save()
      res.redirect('/products/lists');
      console.log(req.body)
  }
  catch(err){
      res.status(400).render('productsales', {title:"Products", routeName:"Products"})
      // console.log(err);
  }
})

router.get('/lists', async (req, res) => {
  try {
    const pdtDetails = await Product.find();
    res.render('viewproducts', { products: pdtDetails, title: 'Product Details' });
  } catch (err) {
    console.log(err);
    res.send('Failed to retrieve Product Details.');
  }
});

// update products
router.get('/edit/:id', (req, res)=>{
  Product.findById(req.params.id, (err, product)=>{
    res.render('edit_product', {
      title: '',
      product: product
    });
  });
});

// update submit new product in th databasa
router.post('/edit/:id', (req, res)=>{
  let product = {};
  product.name = req.body.name;
  product.price = req.body.price;
  

  let query = {_id: req.params.id};

  Product.update(query, product, (err)=>{
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Product Updated');
      res.redirect('/');
    }
  })
});

// route to get the editproduct page
router.get('/editproduct', (req, res) => {
  res.render('edit_product',{title: 'Edit Product'});
});



module.exports = router;