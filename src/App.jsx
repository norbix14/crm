import React, { Fragment, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
/** Layout **/
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'
/** Componente Home **/
import Home from './componentes/home/Home'
/** Componentes Clientes **/
import Clientes from './componentes/clientes/Clientes'
import EditarCliente from './componentes/clientes/EditarCliente'
import NuevoCliente from './componentes/clientes/NuevoCliente'
/* Componentes Pedidos */
import Pedidos from './componentes/pedidos/Pedidos'
import NuevoPedido from './componentes/pedidos/NuevoPedido'
/* Componentes Productos */
import Productos from './componentes/productos/Productos'
import EditarProducto from './componentes/productos/EditarProducto'
import NuevoProducto from './componentes/productos/NuevoProducto'
import ImagenProducto from './componentes/productos/ImagenProducto'
/* Componente Login */
import Login from './componentes/auth/Login'
/* Componente Context */
import { CRMContext, CRMProvider } from './context/CRMContext'

function App() {
    const [ auth, guardarAuth ] = useContext(CRMContext)
    return (
        <Router>
            <Fragment>
                <CRMProvider value={[ auth, guardarAuth ]}>
                    <Header />
                        <div className="grid contenedor contenido-principal">
                            <Navegacion />
                            <main className="caja-contenido col-9">
                                <Switch>
                                    {/** Home **/}
                                    <Route exact path="/" component={Home} />
                                    {/** Zona de clientes **/}
                                    <Route exact path="/clientes" component={Clientes} />
                                    <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                                    <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                                    {/** Zona de pedidos **/}
                                    <Route exact path="/pedidos" component={Pedidos} />
                                    <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                                    {/** Zona de productos **/}
                                    <Route exact path="/productos" component={Productos} />
                                    <Route exact path="/productos/nuevo" component={NuevoProducto} />
                                    <Route exact path="/productos/imagen/:id" component={ImagenProducto} />
                                    <Route exact path="/productos/editar/:id" component={EditarProducto} />
                                    {/** Zona de autenticacion **/}
                                    <Route exact path="/iniciar-sesion" component={Login} />
                                </Switch>
                            </main>
                        </div>
                </CRMProvider>
            </Fragment>
        </Router>
    )
}

export default App
