import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/store.js'
import { restoreCSRF, csrfFetch } from './store/csrf.js'
import * as sessionActions from './store/sessions';
import { Modal, ModalProvider } from './context/modal.jsx'

const store = configureStore();
if (import.meta.env.MODE !== 'production'){
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}
if (process.env.NODE_ENV !== 'production'){
  window.store=store;
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <Provider store={store}>
       <App />
       <Modal />
      </Provider>
    </ModalProvider>
  </StrictMode>,
)



