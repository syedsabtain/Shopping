import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import {useStripe,useElements,CardElement} from "@stripe/react-stripe-js";
import CardSection from '../components/CardSection'
import { navigate } from 'gatsby';


const Checkout =()=>

{
    const value = useSelector(state=>state.Reduxer)
  const stripe = useStripe();
    
    const calculatetotal=()=>
    {
        let total=0
        for (let index = 0; index < value.length; index++) {
            total += value[index].price*value[index].count;
            
        }
        return total+50
    }
    const  numberWithCommas=(x)=> {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const elements = useElements();
    let[details,setDetails] = useState({
      firtname:'',
      lastName:'',
      email:'',
      address:'',
      phone:''
    })
    const handleDetails=(e,nm)=>{
  
      switch (nm) {
        case 1:
              setDetails({
                firtname:e.target.value,
                lastName:details.lastName,
                email:details.email,
                address:details.address,
                phone:details.phone
              })
          break;
          case 2:
            setDetails({
              firtname:details.firtname,
              lastName:e.target.value,
              email:details.email,
              address:details.address,
              phone:details.phone
            })
        break;
        case 3:
          setDetails({
            firtname:details.firtname,
            lastName:details.lastName,
            email:e.target.value,
            address:details.address,
            phone:details.phone
          })
      break;
      case 4:
        setDetails({
          firtname:details.firtname,
          lastName:details.lastName,
          email:details.email,
          address:e.target.value,
          phone:details.phone
        })
    break;
    case 5:
      setDetails({
        firtname:details.firtname,
        lastName:details.lastName,
        email:details.email,
        address:details.address,
        phone:e.target.value,
      })
  break;
      
        default:
          break;
      }
    }
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        
        const secretkey = await fetch('/.netlify/functions/Payment',{
          method:'POST',
          body:JSON.stringify({data:parseInt(calculatetotal())})
        })
        console.log(parseInt(calculatetotal()),'total')
        const res = await secretkey.json();
        console.log(res,'resssss')
        const result = await stripe.confirmCardPayment(res.CLIENT_SECRET,{
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: details.firtname.concat(" "+details.lastName),
              address: details.address,
              phone:details.phone,
              email:details.email
              
            },
          }
        });

        
    
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert('Error Contact Administrator')
        } else {
          // The payment has been processed!
          if (result?.paymentIntent.status === 'succeeded') {
            alert('payment succedded')
            navigate('/')
          }
        }
      };
    return(
    
        <div className="container mt-5 bg-checkout p-5">
        <div className="row mt-5">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-black">Your cart</span>
    <span className="badge badge-secondary badge-pill">{Object.keys(value).length}</span>
            </h4>
            <ul className="list-group mb-3">
              {value.map((product,key)=>{return(
                  <li key={key} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
              <h6 className="my-0">{product.name.replace(/-/g,' ').toUpperCase()}</h6>
              <small className="text-muted">Quantity = {product.count}</small>
                  </div>
              <span className="text-muted">${numberWithCommas(product.price*product.count )}</span>
                </li>
              )})}
              
              
              
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
              <strong>${numberWithCommas(calculatetotal())}</strong>
              </li>
            </ul>
  
            <form className="card p-2" >
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code"/>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1" >
            <h4 className="mb-3">Billing address</h4>
            <form className=""  onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" id="validationCustom01"  placeholder='FirtName' required  onChange={(e)=>{handleDetails(e,1)}}/>
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" id="validationCustom02"  placeholder='LastName' required  onChange={(e)=>{handleDetails(e,2)}}/>
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required  onChange={(e)=>{handleDetails(e,3)}}/>
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
  
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="validationCustom03" required  onChange={(e)=>{handleDetails(e,4)}}/>
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
  
            
  
              <div className="row">
              <div className="col-md-6 mb-3">
    <label htmlFor="validationCustom05" className="form-label">Phone Number</label>
    <input type="text" className="form-control" id="validationCustom05" required  onChange={(e)=>{handleDetails(e,5)}}/>
    <div className="invalid-feedback">
      Please provide a valid Phone Number.
    </div>
  </div>
              </div>
             
              <hr className="mb-4"/>
  
              <h4 className="mb-3">Payment</h4>
  
              
              
              
          <CardSection />

          
              <hr className="mb-4"/>
              <button disabled={!stripe} className='btn btn-outline-info mt-2' type='submit'>Confirm order</button>
            </form>
          </div>
        </div>
      </div>
        
    )
}


export default Checkout