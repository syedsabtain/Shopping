import {createSlice} from '@reduxjs/toolkit'

const initialdata = []

export const ReduxSlicer = createSlice({

    name: 'MainStore',
    initialState: initialdata,
    reducers: {
        addProduct: (state:any, action) => {

            let count:any = state.find((val:any) => val.id === action.payload.id);

            if (count) {

                count.count = 1

            } else {
                state.push(action.payload)
            }

        },
        deleteProduct: (state, action) => {

            return (state.filter((value:any) => value.id !== action.payload))
        },
        updateProduct: (state, action) => {
            let value:any = state.find((val:any) => val.id === action.payload.obj);

            console.log(action.payload)

            if (value) {

                value.count++

            }

        },
        removeProduct: (state, action) => {
            let value:any = state.find((val:any) => val.id === action.payload.obj);

            console.log(action.payload)

            if (value) {

                if (value.count > 0) {
                    value.count--
                }

            }

        }

    }

})


export const {
    addProduct,
    deleteProduct,
    updateProduct,
    removeProduct
} = ReduxSlicer.actions