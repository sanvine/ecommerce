const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({
    name:String,
    price :String,
    description:String,
    ratings:String,
    images:[
        {
            image:String
        }
    ],
    catagory:String,
    seller:String,
    Stock:String,
    numOfReviews:String,
    createdAt:Date

})

const productModel=mongoose.model('Product',productSchema)
module.exports=productModel;
