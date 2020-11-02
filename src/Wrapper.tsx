import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducers/reducer';
import App from './App';
// import './index.css';

const store = createStore(reducer, applyMiddleware(thunk));

export default function Wrapper() {
    return(
        <Provider store={store}>
            <App />
        </Provider >
    );    
}