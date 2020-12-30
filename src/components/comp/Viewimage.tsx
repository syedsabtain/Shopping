import React, {useState} from 'react'
import store from '../Store/MugStore'
import {addProduct, removeProduct, updateProduct} from '../../React-redux/Slicer/ReduxSlicer'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'gatsby'
import Maintemp from "../../templates/Maintemp"


const Viewimage = ({pageContext}) => {

    
    const dispatch = useDispatch()
    let [lab,
        setLab] = useState<any>({})
    const value = useSelector((state) => state)
    const Alldata = {
        ...store,
    };
    console.log('all the data', Alldata)
    const handleAdd = (obj) => {

        dispatch(addProduct({name: obj.name, price: obj.price, image: obj.img, id: obj.id, count: obj.count}))
    }
    const updat = (obj) => {
        setLab({
            element: <span className='ml-3 '>added to cart</span>,
            id: obj
        })

    }

    const relement = (id, name, img, price, count) => {
        let data:any = {}

        if (lab.id === id) {
            data = {
                first: <span key={'oner'}>
                    <Link to='/Cart' className='btn btn-outline-dark '>View in cart</Link><br/>
                    <span className='mt-3 '>
                        Added to cart</span>
                </span>,
                second: <h5 key={'one'}>Quantity
                        <button className='btn btn-sm btn-outline-info' onClick={() => handleMinus(id)}>-</button>
                        {(handleQuantity(id))}
                        <button
                            className='btn btn-sm btn-outline-info'
                            onClick={() => {
                            handlePlus(id);
                        }}>+</button>
                    </h5>
            }
        } else {
            data = {
                third: <button
                        key={'onet'}
                        className='btn btn-outline-danger mt-3'
                        onClick={() => {
                        handleAdd({name, price, id, img, count});
                        updat(id)
                    }}>Add to Cart</button>
            }
        }
        return (data)

    }
    const handlePlus = (obj) => {

        const data = {
            obj
        }
        dispatch(updateProduct(data))
    }
    const handleMinus = (obj) => {

        const data = {
            obj
        }
        dispatch(removeProduct(data))

    }
    const handleQuantity = (obj) => {

        const count = value?.Reduxer.map((value) => {
                if (value.id === obj) {
                    return value.count
                }

            })
            console.log(value,'after adding')
        return count

    }
    console.log(value.Reduxer,'viewimage')
    return (
        <Maintemp>
        <div className='viewimage mb-5'>
            <div className=' align-items-center text-center'>

                {Object
                    .entries(Alldata)
                    .map(([
                        slug, {
                            name,
                            img,
                            price,
                            id,
                            count
                        },
                        
                    ]) => {
                        console.log('slug',  pageContext?.data)
                        if (slug === pageContext?.data) {
                            return (
                                <div key={slug}>
                                    <img src={img} className='d-block w-100 shadow-lg mb-5' alt="face"/>
                                    <div className='shadow-lg mt-5 p-5'>
                                        <h3>{name}</h3>
                                        <h5>Price = {price}
                                            $</h5>
                                        {relement(id, name, img, price, count).second}
                                        {relement(id, name, img, price, count).third}
                                        <div className='mt-3'>
                                        {relement(id, name, img, price, count).first}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return
                        }
                    })}
            </div>
        </div>
        </Maintemp>
    )
}

export default Viewimage