import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/variables.scss'
import { store } from '@/stores/index.ts'
import App from '@/App.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
