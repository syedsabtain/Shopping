
import React from "react"
import Maintemp from "./Maintemp"

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext
  return (
    <Maintemp>
      <div className='container mt-5'>
      <h1>{product.title}</h1>
      <div>{product.description}</div>
      <div className="col-md-4" >

                <div className="card mb-4 shadow-lg cardbody">
                    
                        <img src={product.images[0].originalSrc}  className='card-img-top cardimage'/>
                    
                    <div className="card-body cardbody">
                    <div className="card-text  ">
                            <h6>{product.title}</h6>
                            <h6 className=''>Price = {product.priceRange.minVariantPrice.amount}$</h6>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            
                            <button className='btn btn-outline-info' >Add Items</button>
                            


                                           </div>

                        </div>
                    </div>

                </div>
            </div>
      </div>
      </Maintemp>
  )
}
export default ProductTemplate