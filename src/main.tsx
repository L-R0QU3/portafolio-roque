import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const Admin = lazy(() => import('./Admin'))
const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

if (isAdmin) {
  const saved = localStorage.getItem('theme-v3')
  document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : true)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <Suspense fallback={null}><Admin /></Suspense> : <App />}
  </StrictMode>,
)
