var db = require('../config/connection')
var collection=require('../config/collections');
var objectId=require("mongodb").ObjectId
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');
const { response } = require('express');
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
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:new objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:new objectId(proId)},{
                $set: {
                    name:proDetails.name, // Match form field names (e.g. 'name' from the form)
                    description:proDetails.description, // Same here for description
                    price:proDetails.price,
                    category:proDetails.category
                }
            }
        ).then((response) => {
            resolve(response)
            })
        })
    }
    
}