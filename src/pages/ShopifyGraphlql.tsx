import React, { useEffect, useState } from 'react'
import Maintemp from '../templates/Maintemp'
import {gql,useMutation} from '@apollo/client'

import {graphql,Link} from 'gatsby'

export const Maindata =graphql`
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
  }`
const CHECKOUT_MUTATION = gql`
mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          totalPrice
          lineItems(first:100){
            edges{
              node{
                quantity
                id
                title,
                variant{
                  id
                  priceV2{
                    amount
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
  }`

  const CHECKOUT_LINEADD = gql`
  mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
        totalPrice
        lineItems(first:100){
          edges{
            node{
              quantity
              id
              title,
              variant{
                id
                priceV2{
                  amount
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
  `
  
export default({data})=>{
    console.log(data,'dt')
    const [checkoutCreate]= useMutation(CHECKOUT_MUTATION);
    const [addItem] = useMutation(CHECKOUT_LINEADD);
    let [checkoutdata,setCheckoutdata] = useState<any>()
   
    const HandleAdd=(varid:string)=>{
      
     
      }
    useEffect(()=>{
        
        const token = localStorage.checkdata;
        console.log(token,'teoe')
        if(!token){
            (async()=>{
                const checkoutToken = await  checkoutCreate({
                    variables:{
                        input:{}
                    }
                })
                console.log(checkoutToken.data.checkoutCreate.checkout,'cehkctoken')
                setCheckoutdata(checkoutToken.data.checkoutCreate.checkout)
                
                localStorage.checkdata = JSON.stringify(checkoutToken.data.checkoutCreate.checkout)
            }
            )()
        }
        else{
           
                setCheckoutdata(JSON.parse(localStorage.checkdata));
                
            
        }
        

    },[])
     return(
        <Maintemp>
            <div className='container mt-5 text-center'>
                <h1 >Shopify Using GraphQl</h1>
                
                <h1>Total Price : {checkoutdata?.totalPrice}</h1>
                <button className='btn btn-outline-danger' onClick={()=>{console.log(checkoutdata,'chekoutbutton')}}>show</button>
                <button className='btn btn-outline-info' onClick={()=>{window.open(checkoutdata.webUrl)}}>Checkout</button>
                <div  className='row d-flex justify-content-center text-center mt-5'>
                {data.allShopifyProduct.edges.map(({ node },key) => (
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
                            <button className='btn btn-outline-info' onClick={()=>{console.log(node.variants[0].id.split("_").pop(),'varianode')}}>show</button>
                            <button className='btn btn-outline-info' onClick={()=>{
                                
                                addItem({
                                    variables:{
                                       "lineItems": [
                                              {
                                                "quantity": 1,
                                                "variantId": node.variants[0].id.split("_").pop()
                                              }
                                            ],
                                        "checkoutId": checkoutdata.id
                                         
                                    }
                                }).then((data)=>{
                                    console.log(data.data.checkoutLineItemsAdd.checkout,'final')
                                     // console.log(newcheckoutdata.data.checkoutLineItemsAdd.checkout,'button')
                                setCheckoutdata(data.data.checkoutLineItemsAdd.checkout)
                                localStorage.checkdata = JSON.stringify(data.data.checkoutLineItemsAdd.checkout)
                                })
                               
                            
                        }}>Add Items</button>
                            


                                           </div>

                        </div>
                    </div>

                </div>
            </div>
      ))} </div>
            </div>
        </Maintemp>
    )
}