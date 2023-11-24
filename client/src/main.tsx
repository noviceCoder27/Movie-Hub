import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider,extendTheme} from '@chakra-ui/react'
import './index.css'

const theme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme = {theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
