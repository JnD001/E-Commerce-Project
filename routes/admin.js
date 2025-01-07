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

  router.get('/delete-product/:id',(req,res)=>{
    let proId=req.params.id
    console.log(proId)
    productHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/')
    })
  })

  router.get('/edit-product/:id',async(req,res)=>{
    let product=await productHelpers.getProductDetails(req.params.id)
    console.log(product)
    res.render('admin/edit-product',{product})
  })

  // router.post('/edit-product/:id',(req,res)=>{
  //   productHelpers.updateProduct(req.params.id,req.body).then(()=>{
  //     let image=req.files.image
  //     let id = req.params.id
  //     const imagePath = `./public/product-image/${id.toString()}.jpg`;
  //     image.mv(imagePath)
  //     res.redirect('/admin')
  //   })
  // })
  router.post('/edit-product/:id', (req, res) => {
    productHelpers.updateProduct(req.params.id, req.body).then(() => {
      // Check if image exists
      if (req.files && req.files.image) {
        let image = req.files.image;
        let id = req.params.id;
        const imagePath = `./public/product-image/${id.toString()}.jpg`;
  
        // Move the image to the desired path
        image.mv(imagePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error uploading image');
          } else {
            console.log('Image uploaded successfully');
          }
        });
      }
      res.redirect('/admin');
    }).catch((err) => {
      console.log('Error updating product:', err);
      res.status(500).send('Error updating product');
    });
  });

module.exports = router;
