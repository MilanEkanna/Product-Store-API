import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> //here we provide the Redux store to the entire app
       
        <BrowserRouter>
          <App />
        </BrowserRouter>
     
    </Provider>
  </React.StrictMode>
)