import React from 'react'
import Imagee from '../images/imagee'
import Maintemp from '../templates/Maintemp'

export default()=>{

    const productData= [{
        "name":'IPHONE11',
        "image":'/iphone11.jpg',
        "description":"NEW BRAND NEW IPHONE 11 PRO",
        "id":"39",
        "price":"1000",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
    },
    {
        "name":'Bowl',
        "image":'/image1.jpg',
        "description":'New Design Bowl',
        "id":"40",
        "price":"100",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
    },
   
     {
        "name":     'Soup bowl brown',
        "image": '/image2.jpg',
         "description":     'Soup bowl brown',
        "price":"234",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"41",
        count:1
    },
     {
        "name":     'Soup bowl black-pattern',
        "image": '/image3.jpg',
         "description":     'Soup bowl black-pattern',
        "price":"543",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"42",
        count:1
    },
     {
        "name":     'Small Bowl blue',
        "image": '/image4.jpg',
         "description":     'Small Bowl blue',
        "price":"678",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"43",
        count:1
    },
     {
        "name":     'Bowl ancient-design',
        "image": '/image5.jpg',
         "description":     'Bowl ancient-design',
        "price":"765",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"44",
        count:1
    },
     {
        "name":     'Bowl blue-pattern',
        "image": '/image6.jpg',
         "description":     'Bowl blue-pattern',
        "price":"122",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"45",
        count:1
    },
     {
        "name":     'Large oval bowl blue',
        "image": '/image7.jpg',
         "description":     'Large oval bowl blue',
        "price":"787",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"46",
        count:1
    },
     {
        "name":     'Large Soup bowl blue',
        "image": '/image8.jpg',
         "description":     'Large Soup bowl blue',
        "price":"987",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"47",
        count:1
    },
     {
        "name":     'Large Soup bowl white',
        "image": '/image9.jpg',
         "description":     'Large Soup bowl white',
        "price":"432",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"48",
        count:1
    },
     {
        "name":     'Soup bowl clay',
        "image": '/image10.jpg',
         "description":     'Soup bowl clay',
        "price":"234",
        "url":"https://stripe-snipcart-syedsabtain.netlify.app/Snipcart/",
        "id":"49",
        count:1
    }]

    return(
        <Maintemp>
            <div  className='container mt-5'>
            <div className='row d-flex justify-content-center text-center'>
                <div className='col-md-6 '>
                    <h3>Total Items = <span className='snipcart-items-count'></span></h3>
                    <h3>Total Amount = <span className='snipcart-total-price'></span></h3>
                </div>
                
            </div>
            <div className='row text-center d-flex justify-content-center p-4'>

                
                  {productData.map((value,key)=>{
                      return(
                        <div className="col-md-4 p-4" key={key}>

                        <div className="card mb-4 shadow-lg cardbody">
                            
                                <img src={value.image} alt="" className='card-img-top cardimage'/>
                            
                            <div className="card-body cardbody">
                                <p className="card-text cardtextp d-flex justify-content-between">
                                    {value.name}
                                    <span className=''>Price = {value.price}$</span>
                                </p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                    <button className="snipcart-add-item btn btn-sm btn-outline-info"
                                     data-item-id={value.id}
                                     data-item-price={value.price}
                                     data-item-url={value.url}
                                     data-item-description={value.description}
                                     data-item-image={value.image}
                                     data-item-name={value.name}>
                                    Add to cart
                                    </button>



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