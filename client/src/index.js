import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

const jsx = (
   <Provider store={store}>
 
     <App/>

   </Provider>
)


ReactDOM.render( jsx , document.getElementById('root'));

