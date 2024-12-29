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
    }
};
