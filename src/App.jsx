import { useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'

import Home from './componentes/home/Home'

import Clientes from './componentes/clientes/Clientes'
import EditarCliente from './componentes/clientes/EditarCliente'
import NuevoCliente from './componentes/clientes/NuevoCliente'

import Pedidos from './componentes/pedidos/Pedidos'
import NuevoPedido from './componentes/pedidos/NuevoPedido'

import Productos from './componentes/productos/Productos'
import EditarProducto from './componentes/productos/EditarProducto'
import NuevoProducto from './componentes/productos/NuevoProducto'
import ImagenProducto from './componentes/productos/ImagenProducto'

import Login from './componentes/auth/Login'
import CrearCuenta from './componentes/auth/CrearCuenta'

import { CRMContext, CRMProvider } from './context/CRMContext'

/**
 * Componente principal que renderiza toda la aplicacion
*/
const App = () => {
  const [ auth, setAuth ] = useContext(CRMContext)

  return (
    <BrowserRouter>
      <>
        <CRMProvider value={[ auth, setAuth ]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Home />} />

                <Route exact path="/clientes" element={<Clientes />} />
                <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
                <Route exact path="/clientes/editar/:id" element={<EditarCliente />} />

                <Route exact path="/pedidos" element={<Pedidos />} />
                <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido />} />

                <Route exact path="/productos" element={<Productos />} />
                <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
                <Route exact path="/productos/imagen/:id" element={<ImagenProducto />} />
                <Route exact path="/productos/editar/:id" element={<EditarProducto />} />

                <Route exact path="/iniciar-sesion" element={<Login />} />
                <Route exact path="/crear-cuenta" element={<CrearCuenta />} />

                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </>
    </BrowserRouter>
  )
}

export default App
