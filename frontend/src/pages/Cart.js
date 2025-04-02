import React, { Fragment, useState } from 'react'
import { json, Link } from 'react-router-dom'
import {toast} from 'react-toastify'

const Cart = ({cartitems,setCartitems}) => {
    const [complete,setComplete]=useState(false)

    const increaseqty=(items)=>{
        if(items.product.stock===items.qty){
            return;     
        }
       const updatedItems=cartitems.map((i)=>{
        if(i.product._id===items.product._id){
            i.qty++
        }
        return i
       })
       setCartitems(updatedItems)
    }
    const decreaseqty=(items)=>{
        if(items.qty>1){
            const updatedItems=cartitems.map((i)=>{
                if(i.product._id===items.product._id){  
                    i.qty--
                }
                return i
            })  
            setCartitems(updatedItems)
        }   
    
        



        
    }

    const removeItems=(items)=>{
            const updatedItems=cartitems.filter((i)=>{
                if(i.product._id!==items.product._id){
                    return true;
                }
                
                })  
            setCartitems(updatedItems)
            //console.log(cartitems)
        }
    const placeOrder=()=>{
        fetch(process.env.REACT_APP_API_URL+'/order',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(cartitems)
        })
 
        .then(()=>{
            setCartitems([])
            setComplete(true)
            toast.success("order success")
        })
    }


  return (
    
    cartitems.length>0 ? 
    <Fragment>
    <div className="container container-fluid">
    <h2 className="mt-5">Your Cart: <b>{cartitems.length} items</b></h2>
    
    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          
          {cartitems.map((items)=>(
            
            <Fragment>
                <hr />
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={items.product.images[0].image} alt={items.product.name} height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                        <Link to={"/products/"+items.product._id}><a href="#">{items.product.name}</a></Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{items.product.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>decreaseqty(items)}>-</span>
                                <input type="number" className="form-control count d-in6
                                line" value={items.qty} readOnly />

                                <span className="btn btn-primary plus" onClick={()=>increaseqty(items)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeItems(items)}></i>
                        </div>

                    </div>
                </div>  
            </Fragment>))}
        </div>

        <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">{cartitems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">{cartitems.reduce((acc,item)=>(acc+item.product.price*item.qty),0)}</span></p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder }>Place Order</button>
            </div>
        </div>
    </div>
    </div>
    </Fragment>   :<Fragment><h2 className='mt-5'>Your cart is empty</h2> 
    <p>Your order has been completed successfully</p> </Fragment>
  )
}

export default Cart
