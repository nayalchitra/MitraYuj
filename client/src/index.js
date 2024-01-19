import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
// import { reducer } from './reducers/counterReducer';
import { thunk } from 'redux-thunk';
import {logger} from 'redux-logger';

const root = ReactDOM.createRoot(document.getElementById('root'));


// to add reducer
const store = createStore(rootReducer, applyMiddleware(logger,thunk));
// logger should be the first one to execute the logs

root.render(
<React.StrictMode>
<Provider store = {store}>
    <App />
  </Provider>
</React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
