import { BrowserRouter } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App