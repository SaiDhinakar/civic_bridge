import { BrowserRouter } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AppRoutes from './routes/AppRoutes'
import { NGOProvider } from './context/NGOContext'

function App() {
  return (
    <NGOProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NGOProvider>
  )
}

export default App