import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import Toast from '../../helpers/Toast'
import { CRMContext } from '../../context/CRMContext'
import { deleteCliente } from './handleCliente'

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
                deleteCliente(idCliente, auth.token, res => {
                    if(res.ok) {
                        Toast('success', res.msg)
                    } else {
                        Toast('warning', res.msg)
                    }
                })
			}
		})
	}

	if(!auth.auth) {
		history.push('/iniciar-sesion')
	}

	return (
	    <li className="cliente">
	        <div className="info-cliente">
	            <p className="nombre">Cliente: {nombre} {apellido}</p>
	            <p className="empresa">Empresa: {empresa}</p>
	            <p>Email: {email}</p>
	            <p>Teléfono: {telefono}</p>
	        </div>
	        <div className="acciones">
                <Link 
                    to={"/clientes/editar/" + _id} 
                    className="btn btn-azul"
                ><i className="fas fa-pen-alt"></i>
	               Editar Cliente
	            </Link>
	            <Link 
                    to={"/pedidos/nuevo/" + _id} 
                    className="btn btn-amarillo"
                ><i className="fas fa-plus"></i>
	               Nuevo Pedido
	            </Link>
	            <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                ><i className="fas fa-times"></i>
	               Eliminar Cliente
	            </button>
	        </div>
	    </li>
	)
}

export default withRouter(Cliente)
