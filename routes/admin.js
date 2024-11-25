var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:'iPhone',
      category:'Mobile',
      description:'This is a good IPhone',
      image:'https://inspireonline.in/cdn/shop/files/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__en-IN_cbc3aa67-48aa-4ab9-af51-16e152c38155.jpg?v=1727250829'
    },
    {
      name:'Samsung',
      category:'Mobile',
      description:'This is a good Samsung phone',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-LaKyJAa5q8mRAYVLD3_QcajJUsM59O3XA&s'
    },
    {
      name:'POCO',
      category:'Mobile',
      description:'This is a good POCO phone',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsV8ZMOw_8U-igo9te6M18G60n2VBmKT7AMA&s'
    },
    {
      name:'VIVO',
      category:'Mobile',
      description:'This is a good VIVO phone',
      image:'https://vasanthandco.in/UploadedFiles/productimages/20240622113325-61p9OByM1kL._SX679_.jpg'
    },
    
  ]
  res.render('admin/view-products',{admin:true,products})
});

  router.get('/add-product',(req,res)=>{
    res.render('admin/add-product')
  })

  router.post('/add-product',(req,res)=>{
    console.log(req.body)
    console.log(req.files.image)
  })

module.exports = router;
