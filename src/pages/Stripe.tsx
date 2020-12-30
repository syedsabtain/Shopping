import  React,{useState} from "react"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Maintemp from "../templates/Maintemp";
import {useSelector,useDispatch} from 'react-redux'
import mugstore from '../components/Store/MugStore'
import {addProduct} from '../React-redux/Slicer/ReduxSlicer'
import {Link} from 'gatsby'
import {Link as ReachLink} from '@reach/router'
import {navigate} from 'gatsby'

export default()=>{

  const data = useSelector((state)=>state);
  console.log(data.Reduxer,'state')
  let [count,
    setCount] = useState(0)

let [lab,setLab] = useState<any>({})

const dispatch = useDispatch()
const handleadd = (obj) => {

    dispatch(addProduct({name: obj.name, image: obj.img, price: obj.price, id: obj.id, count: 1}))
}
const updat = (obj) => {
    setLab({
        element: <span className='ml-3 '>added to cart</span>,
        id: obj
    })

}
const relement = (id) => {
    if (lab.id === id) {
        return (
            <span>
                <Link to='/Cart' className='btn btn-outline-dark ml-3'>View in cart</Link><br/>
                <span className='mt-3 ml-3'>
                    Added to cart</span>
            </span>
        )
    }

}
  return(
    <Maintemp>
      <div className='container mt-5 p-5 '>
          
      <div className='col-md-12'>
      {/* <i className="fas fa-shopping-cart  fa-4x " /> */}
      <Link type="button" className="btn btn-outline-danger  " to='/Cart'>
     <span className="badge">
     <i className="fas fa-shopping-cart  fa-2x " /> {data.Reduxer.length}</span>
        {/* <span className="visually-hidden">unread messages</span> */}
</Link>

      </div>
            <div className='row mt-5 '>

                {Object
                    .entries(mugstore)
                    .map(([
                        slug, {
                            name,
                            price,
                            img,
                            id
                        }
                    ], key) => {
                        return (

                            <div className="col-md-4" key={key}>

                                <div className="card mb-4 shadow-lg cardbody">
                                    <button className='border-0 imgbtn '  onClick={()=>{navigate(`/MainProducts/${name.replace(/\s/g, '')}`)}} >
                                        <img src={img} alt="" className='card-img-top cardimage'/>
                                    </button>
                                    <div className="card-body cardbody">
                                        <p className="card-text cardtextp d-flex justify-content-between">
                                            {name}
                                            <span className=''>Price = {price}$</span>
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                    setCount(++count);
                                                    handleadd({name, price, id, img});
                                                    updat(key);
                                                }}>Buy</button>

                                                {relement(key)}
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">key = value{key}</button> */}
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



