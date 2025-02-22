import { Hero } from './components/hero/Hero'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useEffect } from 'react'
function App() {
  const currentColor = useSelector((state: RootState) => state.color.mode)
  
  useEffect(() =>{
    document.body.className = currentColor === 'dark' ? 'theme-dark' :'theme-light'
  },[currentColor])

  return (
    <main className='max-w-[1660px] mx-auto'>
      <Hero />
    </main>
  )
}

export default App
