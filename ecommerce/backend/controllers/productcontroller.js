const productModel=require('../models/productmodel')


exports.getProducts=async(req,res,next)=>{
    const query=req.query.keyword?{name:{
        $regex:req.query.keyword,
        $options:'i'
    }}:{}   
    const products=await productModel.find(query);
    res.json({
        success:true,
        products
     })
}

exports.getSingleProducts=async(req,res,next)=>{
    try{
    const Product=await productModel.findById(req.params.id);
    res.json({
      success:true,
        Product
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:' unable to get the product'
})
}
}