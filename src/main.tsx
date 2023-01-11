import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ChakraProvider } from '@chakra-ui/react'

let history = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </PersistGate>
  </Provider>
)
