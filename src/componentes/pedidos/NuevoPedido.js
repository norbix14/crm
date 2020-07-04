import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import FormBuscarProducto from './FormBuscarProducto'
import FormCantidadProducto from './FormCantidadProducto'
import { CRMContext } from '../../context/CRMContext'

function NuevoPedido(props) {
    const { id } = props.match.params
    const [ auth ] = useContext(CRMContext)
    const [ cliente, guardarCliente ] = useState({})
    const [ busqueda, guardarBusqueda ] = useState('')
    const [ productos, guardarProductos ] = useState([])
    const [ total, guardarTotal ] = useState(0)
    const buscarProducto = async e => {
        e.preventDefault()
        try {
            const url = `/productos/busqueda/${busqueda}`
            clienteAxios.post(url,
                {
                    params: {
                        query: busqueda
                    }
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            .then(response => {
                if(response.status === 200) {
                    if(response.data[0]) {
                        let productoResultado = response.data[0]
                        productoResultado.producto = response.data[0]._id
                        productoResultado.cantidad = 0
                        guardarProductos([
                            ...productos,
                            productoResultado
                        ])
                    } else {
                        Toast('warning', 'Lo sentimos, no hay resultados')
                    }
                }
            })
            .catch(err => {
                Toast('warning', 'Lo sentimos, error en la petición')
            })
        } catch(err) {
            Toast('error', 'Ha ocurrido un error')
        }
    }
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }
    const restarProductos = i => {
        const todosProductos = [...productos]
        if(todosProductos[i].cantidad === 0) return
        todosProductos[i].cantidad--
        guardarProductos(todosProductos)
        actualizarTotal()
    }
    const sumarProductos = i => {
        const todosProductos = [...productos]
        todosProductos[i].cantidad++
        guardarProductos(todosProductos)
        actualizarTotal()
    }
    const actualizarTotal = useCallback(() => {
        if(productos.length === 0) {
            guardarTotal(0)
            return
        }
        let nuevoTotal = 0
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
        guardarTotal(nuevoTotal)
    }, [productos])
    const eliminarProductoPedido = id => {
        const productosFiltrados = productos.filter(producto => producto.producto !== id)
        guardarProductos(productosFiltrados)
    }
    const realizarPedido = async e => {
        e.preventDefault()
        const { id } = props.match.params
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }
        const url = `/pedidos/nuevo/${id}`
        const agregarPedido = await clienteAxios.post(url,
            pedido,
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        )
        if(agregarPedido.status === 200) {
            if(agregarPedido.data) {
                if(agregarPedido.data.error) {
                    Toast('warning', 'No se ha podido agregar')
                } else {
                    Toast('success', agregarPedido.data.mensaje)
                    props.history.push('/pedidos')
                }
            }
        } else {
            Toast('error', 'Ha ocurrido un error')
        }
    }
    // ATENCION: LOOP INFINITO si se agrega [productos] como dependencia
    useEffect(() => {
        async function consultarAPI() {
            const url = `/clientes/${id}`
            const obtenerCliente = await clienteAxios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            guardarCliente(obtenerCliente.data)
        }
        consultarAPI()
        actualizarTotal()
    }, [id, actualizarTotal, auth.token])
    if(!auth.auth) {
        props.history.push('/iniciar-sesion')
    }
	return (
	    <Fragment>
			<h2>Nuevo pedido</h2>
			<div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Teléfono: {cliente.telefono}</p>
                <p>Email: {cliente.email}</p>
                <p>Empresa: {cliente.empresa}</p>
            </div>
            <FormBuscarProducto 
                buscarProducto={buscarProducto} 
                leerDatosBusqueda={leerDatosBusqueda} 
            />
            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto 
                        producto={producto} 
                        key={producto.producto} 
                        restarProductos={restarProductos}
                        sumarProductos={sumarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">Total a pagar: <span>${total}.-</span></p>
            {
                total > 0 ? (
                    <form onSubmit={realizarPedido}>
                        <input type="submit" className="btn btn-verde btn-block" 
                            value="Realizar el pedido" />
                    </form>
                ) : null
            }
	    </Fragment>
	)
}

export default withRouter(NuevoPedido)
