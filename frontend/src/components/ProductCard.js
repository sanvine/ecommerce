import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                    <img className="card-img-top mx-auto" alt='img1' src={product.images[0].image}/>
                    <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                    <Link to={"/products/"+product._id}><a href="">{product.name}</a></Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer"> 
                        <div className="rating-inner" style={{width:`${product.rating/5*100}%`}}></div>
                        </div>
                    </div>
                    
                    
                    <p className="card-text">{product.price}</p>
                    <Link to={"/products/"+product._id}>
                    <a href="#" id="view_btn" className="btn btn-block">View Details</a></Link>     
                    </div>
                </div>
                </div>
  )
}

export default ProductCard