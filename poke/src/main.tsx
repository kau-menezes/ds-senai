import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./styles/reset.css"

import MainRoutes from './routes/MainRoutes'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MainRoutes/>
    </StrictMode>,
)