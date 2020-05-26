import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import personsReducer from "./model/reducers/PersonReducer";
import insuranceReducer from "./model/reducers/InsuranceReducer";

const rootReducer = combineReducers({
    persons: personsReducer,
    insurance: insuranceReducer,
});

const composeEnhancers = compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancers);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
