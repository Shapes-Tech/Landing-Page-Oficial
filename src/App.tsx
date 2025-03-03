import { Hero } from './components/hero/Hero'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useEffect, useState } from 'react'
import Loading from './components/loading/Loading'
import MainPage from './pages/MainPage'
function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  
  useEffect(() =>{
    document.body.className = currentColor === 'dark' ? 'theme-dark' :'theme-light'
  },[currentColor])
  
  useEffect(() =>{
    const timer = setTimeout(() =>{
      setLoading(false)
    }, 7000)

    return () => clearTimeout(timer)
  },[])

  return (
    <main className='max-w-[1900px] mx-auto'>
      {loading ? <Loading /> : <MainPage />}
    </main>
  )
}

export default App
