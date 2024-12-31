var db = require('../config/connection')
var collection=require('../config/collections');
var objectId=require("mongodb").ObjectId
const { reject } = require('promise');
const { ObjectId } = require('mongodb');
module.exports={

    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.insertedId);
        })
    },
    gelAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: new objectId(prodId) }).then((response) => {
                console.log(response);
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    
}