import React from 'react'
import Maintemp from '../templates/Maintemp'
import { useShoppingCart } from 'use-shopping-cart'

const productData = [
    {
      name: 'Bananas',
      price_id: 'price_1HyDsZDUIQb077dZ1OSo7RWa',
      price: 400,
      image: 'https://www.fillmurray.com/300/300',
      currency: 'USD',
      sku:'price_1HyDtRDUIQb077dZ8RXKjENF'
    },
    {
      name: 'Tangerines',
      price_id: 'price_1HyDsZDUIQb077dZ1OSo7RWa',
      price: 100,
      image: 'https://www.fillmurray.com/300/300',
      currency: 'USD',
      sku:'price_1HyDsZDUIQb077dZ1OSo7RWa'

    }
  ]
export default()=>{

    

      const { totalPrice, redirectToCheckout, cartCount ,addItem,decrementItem,clearCart,cartDetails} = useShoppingCart()
      console.log(cartDetails,'cart')
    return(
        <Maintemp>
            <div className='container'>
                <h1>OpenSource</h1>
                <p>Number of Items: {cartCount}</p>
      <p>Total: {totalPrice}</p>
      
      
      <button className='btn btn-outline-dark' onClick={()=>{clearCart()}}>ClearCart</button>
      <button onClick={()=>{redirectToCheckout()}} className='btn btn-outline-info'>Checkout</button>
                <div className='row d-flex justify-content-center text-center'>
                
      
        {productData.map((value,key)=>{
            return(
                <div className="col-md-4" key={key}>

                <div className="card mb-4 shadow-lg cardbody">
                    
                        <img src={value.image}  className='card-img-top cardimage'/>
                    
                    <div className="card-body cardbody">
                        <p className="card-text cardtextp d-flex justify-content-between">
                            {value.name}
                            <span className=''>Price = {value.price}$</span>
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            
                            <button className='btn btn-outline-info' onClick={()=>{addItem(value,1)}}>Add Items</button>
                            


                                           </div>

                        </div>
                    </div>

                </div>
            </div>
            )
        })}
      {/* This is where we'll render our cart */}
      
    
                </div>
                
            </div>
        </Maintemp>
    )
}