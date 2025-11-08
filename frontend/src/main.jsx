import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-resizable/css/styles.css'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from './components/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </StrictMode>,
)
