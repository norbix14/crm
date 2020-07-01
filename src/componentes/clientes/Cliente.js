import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function Cliente({cliente, history}) {
	const [ auth ] = useContext(CRMContext)
	const { _id, nombre, apellido, empresa, email, telefono } = cliente
	const eliminarCliente = idCliente => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Esto no se puede revertir",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrar',
			cancelButtonText: 'No, cancelar'
		})
		.then(resultado => {
			if(resultado.value) {
				const url = `/clientes/${idCliente}`
				clienteAxios.delete(url, {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				.then(response => {
					if(response.status === 200) {
						if(response.data.error) {
							Toast('error', 'Ha ocurrido un error')
						} else {
							Toast('success', response.data.mensaje)
						}
					}
				})
				.catch(err => {
					Toast('error', 'Ha ocurrido un error')
				})
			}
		})
	}
	if(!auth.auth && (localStorage.getItem('token') === auth.token)) {
		history.push('/iniciar-sesion')
	}
	return (
	    <li className="cliente">
	        <div className="info-cliente">
	            <p className="nombre">{nombre} {apellido}</p>
	            <p className="empresa">{empresa}</p>
	            <p>{email}</p>
	            <p>Tel: {telefono}</p>
	        </div>
	        <div className="acciones">
	            <Link to={"/clientes/editar/" + _id} className="btn btn-azul">
	                <i className="fas fa-pen-alt"></i>
	                Editar Cliente
	            </Link>
	            <Link to={"/pedidos/nuevo/" + _id} className="btn btn-amarillo">
	                <i className="fas fa-plus"></i>
	                Nuevo Pedido
	            </Link>
	            <button type="button" className="btn btn-rojo btn-eliminar"
	            		onClick={() => eliminarCliente(_id)}>
	                <i className="fas fa-times"></i>
	                Eliminar Cliente
	            </button>
	        </div>
	    </li>
	)
}

export default withRouter(Cliente)
