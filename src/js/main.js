import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

//------------------------------
import App from "./App";
import {rootReducer} from "./redux/reducers/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

