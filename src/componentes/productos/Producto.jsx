import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Swal from 'sweetalert2'
import Toast from '../../helpers/Toast'
import { deleteProduct } from './handleProducto'

const Producto = (props) => {
	const [auth] = useContext(CRMContext)
	const { _id, nombre, precio, imagen } = props.producto

	const eliminarProducto = (idProducto) => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Esto no se puede revertir',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrar',
			cancelButtonText: 'No, cancelar',
		}).then((resultado) => {
			if (resultado.value) {
				deleteProduct(idProducto, auth.token, (res) => {
					if(res.ok) {
						Toast('success', res.msg)
					} else {
						Toast('warning', res.msg)
					}
				})
			}
		})
	}

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
		<li className="producto">
			<div className="info-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">${precio}.-</p>
				{
					imagen && <img alt="Imagen de producto" src={imagen} />
				}
			</div>
			<div className="acciones">
				<Link 
					className="btn btn-azul" 
					to={'/productos/editar/' + _id}
				><i className="fas fa-pen-alt"></i>
					Editar Producto
				</Link>
				{
					!imagen &&
						<Link 
							className="btn btn-azul" 
							to={'/productos/imagen/' + _id}
						><i className="fas fa-pen-alt"></i>
							Editar Imagen
						</Link>
				}
				<button
					type="button"
					className="btn btn-rojo btn-eliminar"
					onClick={() => eliminarProducto(_id)}
				><i className="fas fa-times"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	)
}

Producto.propTypes = {
	producto: PropTypes.object.isRequired
}

export default withRouter(Producto)
