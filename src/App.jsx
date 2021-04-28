import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
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
/*import CrearCuenta from './componentes/auth/CrearCuenta'*/

import { CRMContext, CRMProvider } from './context/CRMContext'

/**
 * Componente principal que renderiza toda la aplicacion
*/
const App = () => {
  const [ auth, setAuth ] = useContext(CRMContext)

  return (
    <Router>
      <>
        <CRMProvider value={[ auth, setAuth ]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />

                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/imagen/:id" component={ImagenProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />

                <Route exact path="/iniciar-sesion" component={Login} />
                {/*<Route exact path="/crear-cuenta" component={CrearCuenta} />*/}

                <Route component={Home} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </>
    </Router>
  )
}

export default App
