import React from 'react'
import {ReduxSlicer} from '../Slicer/ReduxSlicer'
import {configureStore,} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'

const CombineReducer = combineReducers({
    Reduxer:ReduxSlicer.reducer
})

export  const store = configureStore({
    reducer:CombineReducer
})