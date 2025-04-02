const ordermodel = require("../models/ordermodel")

exports.createOrder=async(req,res,next)=>{
    //console.log(req.body,'DATA');
    //ordermodel.create()
    const cartItems=req.body
    const amount=Number(cartItems.reduce((acc,item)=>(acc+item.product.price*item.qty ),0)).toFixed(2);
    //console.log(amount,"Amount")
    const status='pending';
    const order=await ordermodel.create({cartItems,amount,status})
    res.json({
        success:true,
        //message:"order works!"
        order
    })
}