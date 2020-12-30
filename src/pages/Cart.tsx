import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link,navigate} from 'gatsby'
import {deleteProduct, updateProduct, removeProduct} from '../React-redux/Slicer/ReduxSlicer'

import Maincomp from '../templates/Maintemp'

const Cartcomp = () => {

    const value = useSelector((state) => state.Reduxer)
    const dispatch = useDispatch();

    const handledelete = (obj) => {

        dispatch(deleteProduct(obj))
    }
    const Subtotal = () => {
        let subtotal = 0;
        for (let i = 0; i < value.length; i++) {
            subtotal += value[i].price * value[i].count;

        }
        return (subtotal)
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
    const numberWithCommas = (x) => {
        return x
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <Maincomp>
        <div className="container mt-5 p-5">
            <div className="row mt-5">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Available</th>
                                    <th scope="col" className="text-center">Quantity</th>
                                    <th scope="col" className="text-right">Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {value?.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td><button className='border-0' onClick={()=>{navigate(`/MainProducts/${val?.name.replace(/\s/g, '')}`)}}><img src={val.image} className='cartimage ' alt='cardimage'/></button>
                                                </td>
                                                <td>{val.name}</td>
                                                <td>In stock</td>
                                                <td >
                                                    <div className='row text-center'>
                                                        <div className='col-md-12'>
                                                            <button
                                                                className='btn btn-sm btn-outline-info'
                                                                onClick={() => handleMinus(val.id)}>-</button>
                                                            {val.count}
                                                            <button
                                                                className='btn btn-sm btn-outline-info'
                                                                onClick={() => handlePlus(val.id)}>+</button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right">{numberWithCommas(val.price * val.count)}
                                                    $</td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-danger" onClick={() => handledelete(val.id)}>
                                                        <i className="fa fa-trash"></i>
                                                        </button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Sub-Total</td>
                                    <td className="text-right">{numberWithCommas(Subtotal())}
                                        $</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Shipping</td>
                                    <td className="text-right">50 $</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td className="text-right">
                                        <strong>{numberWithCommas(Subtotal() + 50)}
                                            $</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6">
                            <Link className="btn btn-block btn-light" to='/Stripe'>Continue Shopping</Link>
                        </div>
                        <div className="col-sm-12 col-md-6 text-right">
                            <Link className="btn btn-lg btn-block btn-success text-uppercase" to='/Checkout'>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Maincomp>
    )
}

export default Cartcomp