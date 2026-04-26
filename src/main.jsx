import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import './styles/sidebar.css'
import './styles/dashboard.css'
import './styles/cards.css'
import './styles/tables.css'
import './styles/forms.css'
import './styles/ngo/ngo-dashboard.css'
import './styles/ngo/ngo-cards.css'
import './styles/ngo/ngo-tables.css'
import './styles/ngo/ngo-forms.css'
import './styles/ngo/ngo-sidebar.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
