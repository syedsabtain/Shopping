import React, { useEffect } from 'react'
import Maintemp from '../templates/Maintemp'
import {Link,graphql} from 'gatsby'
import Client from 'shopify-buy';
import { useState } from 'react';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'sabtainteststore.myshopify.com/',
  storefrontAccessToken: '566aa075c17384eb6a6139388f670e1f'
});
export const query = graphql`
{
    allShopifyProduct(sort: {fields: [title]}) {
      edges {
        node {
          title
          images {
            originalSrc
          }
          shopifyId
          description
          availableForSale
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          id
          handle
          variants {
            id
            shopifyId
          }
        }
      }
    }
  }
  `


export default({data})=>{
    
    let[session,setSession] = useState<any>()
    // data.allShopifyProduct.edges.map(({ node },key) =>{
    //     console.log(node.images[0].originalSrc,'images')
    // })
    useEffect(()=>{
      
        const token = localStorage.name;
        console.log(token,'teoe')
        if(!token){
            (async()=>{
                const checkoutToken = await client.checkout.create();
                setSession(checkoutToken)
                const id = await checkoutToken.id
                localStorage.name = id
            }
            )()
        }
        else{
            (async()=>{
                 const data:any =  localStorage.name
                const newdata = data
                 console.log(newdata,'li')
                const token = await client.checkout.fetch(data)
                setSession(token)
                // console.log(token,'sess')
            })()
        }

        // client.checkout.create().then((checkout) => {
        //     // Do something with the checkout
        //     setSession(checkout);
        //     localStorage.setItem("session",checkout)
        //     console.log(checkout,'check');
          
        //   });
    },[])
console.log(data,'data')

    return(
        <Maintemp>
            <div className='container'>
                <button className='btn btn-outline-info' onClick={()=>{
                    console.log(session)
                    localStorage.Shid=session?.id;
                }}>add</button>
                <button className='btn btn-outline-info' onClick={()=>{
                    console.log(localStorage.Shid,'btn')
                    alert(localStorage.name)
                }}>show</button>
                <h1>Shopify</h1>
                <h2>Total : {session?.totalPrice}</h2>
                <button onClick={()=>{
                  window.open(session?.webUrl)
                }}>Checkout</button>
                <div className='row d-flex justify-content-center text-center'>
                {data.allShopifyProduct.edges.map(({ node },key) => (
        // <li key={node.shopifyId}>
        //   <h3>
        //     <Link to={`/Shopify/${node.handle}`}>{node.title}</Link>
        //     {" - "}${node.priceRange.minVariantPrice.amount}
        //   </h3>
        //   <p>{node.description}</p>
        // </li>
        <div className="col-md-4" key={key}>

                <div className="card mb-4 shadow-lg cardbody">
                    
                       <Link to={`/Shopify/${node.handle}`}><img src={node.images[0].originalSrc}  className='card-img-top cardimage'/></Link> 
                    
                    <div className="card-body cardbody">
                        <div className="card-text  ">
                            <h6>{node.title}</h6>
                            <h6 className=''>Price = {node.priceRange.minVariantPrice.amount}$</h6>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            
                            <button className='btn btn-outline-info' onClick={()=>{
                                console.log(node.shopifyId,'shid')
                                const lineItemsToAdd =
                                    {
                                    variantId: node.variants[0].id.split("_").pop(),
                                    quantity: 1,
                                }
                            
                                client.checkout.addLineItems(session?.id,lineItemsToAdd).then((checkout) => {
                                    // Do something with the updated checkout
                                    setSession(checkout)
                                    localStorage.setItem("session",checkout)
                                    console.log(checkout.lineItems,'lineitems'); // Array with one additional line item
                                  });
                            }}>Add Items</button>
                            


                                           </div>

                        </div>
                    </div>

                </div>
            </div>
      ))} </div>
      <div className='row d-flex justify-content-center'>
          {session?.lineItems?.map((value,key)=>{
              return(
                <div className="col-md-4" key={key}>

                <div className="card mb-4 shadow-lg cardbody">
                    
                       <Link to={`/Shopify/${value.variant.product.handle}`}><img src={value.variant.image.src}  className='card-img-top cardimage'/></Link> 
                    
                    <div className="card-body cardbody">
                        <div className="card-text  ">
                            <h6>{value.title}</h6>
                            <h6 className=''>Price = {value.price}$</h6>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            
                            
                            


                                           </div>

                        </div>
                    </div>

                </div>
            </div>
              )
          })}
      </div>
            </div>
        </Maintemp>
    )
}