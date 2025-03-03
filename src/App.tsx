import { Hero } from './components/hero/Hero'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { useEffect, useState } from 'react'
import Loading from './components/loading/Loading'
import MainPage from './pages/MainPage'
// Importa tu acción para cambiar el color (ajusta según tu estructura)
import { setColor } from './store/colorSlice' // ajusta la ruta según tu proyecto

// Función para aplicar el tema inicial desde localStorage
function applyInitialTheme() {
  // Obtener el tema guardado o usar 'light' como predeterminado
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar el tema inicial sin transición
  document.body.classList.add(savedTheme === 'dark' ? 'theme-dark-no-transition' : 'theme-light-no-transition');
  
  return savedTheme; // Devolvemos el tema para usarlo después
}

// Aplicar tema inicial antes del renderizado de React
const initialTheme = applyInitialTheme();

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const dispatch = useDispatch();
  const currentColor = useSelector((state: RootState) => state.color.mode);
  
  // Sincronizar el estado de Redux con el tema guardado al inicio
  useEffect(() => {
    // Solo hacemos esto una vez al cargar la aplicación
    if (initialTheme) {
      dispatch(setColor(initialTheme));
    }
  }, [dispatch]);
  
  // Efecto para manejar el cambio de tema
  useEffect(() => {
    // Limpiar clases antiguas
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-dark-no-transition', 'theme-light-no-transition');
    
    // Aplicar nueva clase, con o sin transición
    if (isInitialRender) {
      document.body.classList.add(currentColor === 'dark' ? 'theme-dark-no-transition' : 'theme-light-no-transition');
      setTimeout(() => setIsInitialRender(false), 50);
    } else {
      document.body.classList.add(currentColor === 'dark' ? 'theme-dark' : 'theme-light');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', currentColor);
  }, [currentColor, isInitialRender]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className='max-w-[1900px] mx-auto'>
      {loading ? <Loading /> : <MainPage />}
    </main>
  );
}

export default App;