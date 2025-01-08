// var db = require('../config/connection')
// var collection=require('../config/collections')
// const bcrypt = require('bcrypt')
// const { resolve, reject } = require('promise')
// module.exports={
//     doSignup:(userData)=>{
//         return new Promise(async(resolve,reject)=>{
//             userData.Password=await bcrypt.hash(userData.Password,10)
//             db.get().collection(collection.USER_COLLECTION).insertOne(userData)
//             resolve(result.insertedId)
//         })

//     }
// }
var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
var objectId=require("mongodb").ObjectId
const { resolve, reject } = require('promise');
const { ObjectId } = require('mongodb');

module.exports = {
    doSignup: (userData) => {
        return new Promise(async(resolve,reject) => {
            
                // Hash the password
                userData.Password = await bcrypt.hash(userData.Password, 10);

                // Insert the user data into the database
                const result = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);

                // Resolve with the inserted document's ID
                resolve(result.insertedId);
           
        });
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user= await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log('Login Successful')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed')
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login Failed')
                resolve({status:false})
            } 
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
            if(userCart){
                db.get().collection(collection.CART_COLLECTION).updateOne({user:new ObjectId(userId)},
                {
                    $push:{products:new ObjectId(proId)}   
                }
            ).then((responses)=>{
                resolve()
            })
            }else{
                let cartObj={
                    user:new ObjectId(userId),
                    products:[new ObjectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                $match:{user:new ObjectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        let:{proList:'$products'},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id','$$proList']
                                    }
                                }
                            }
                        ],
                        as:'cartItems'
                    }
                }
        ]).toArray()
        resolve(cartItems[0].cartItems)
        })
    },
    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count=0
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
            if(cart){
                count=cart.products.length
            }    
            resolve(count)
        })
    }
};
