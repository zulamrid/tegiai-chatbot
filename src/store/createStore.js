import {compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

import app from './app';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducer = combineReducers({
    app,
})

const store = createStore(reducer, composedEnhancer);

export default store;