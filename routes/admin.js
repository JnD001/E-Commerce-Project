var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
const productHelpers = require('../helpers/product-helpers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelpers.gelAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })
});

  router.get('/add-product',(req,res)=>{
    res.render('admin/add-product')
  })

  router.post('/add-product',(req,res)=>{
    console.log(req.body)
    console.log(req.files.image)

    productHelper.addProduct(req.body,(id)=>{

      let image = req.files.image; 
      console.log(id);
      const imagePath = `./public/product-image/${id.toString()}.jpg`;
      image.mv(imagePath,(err,done)=>{
        if(!err){
          res.render('admin/add-product')
        }else{
          console.log(err);
          
        }
      })
    })
  })

module.exports = router;
