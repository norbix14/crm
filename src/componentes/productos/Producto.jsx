import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function Producto({ producto, history }) {
	const [auth] = useContext(CRMContext)
	const { _id, nombre, precio, imagen } = producto

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
				const url = `/productos/${idProducto}`
				clienteAxios
					.delete(url, {
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					})
					.then((response) => {
						if (response.status === 200) {
							if (response.data.error) {
								Toast('warning', response.data.mensaje)
							} else {
								Toast('success', response.data.mensaje)
							}
						}
					})
					.catch((err) => {
						if (err.response) {
							if (err.response.data.error) {
								Toast('error', err.response.data.mensaje)
							} else {
								Toast('error', err.response.data.mensaje)
							}
						} else {
							Toast('error', 'Ha ocurrido un error')
						}
					})
			}
		})
	}

	if (!auth.auth) {
		history.push('/iniciar-sesion')
	}

	return (
		<li className="producto">
			<div className="info-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">${precio}.-</p>
				{imagen ? <img alt="Imagen de producto" src={imagen} /> : null}
			</div>
			<div className="acciones">
				<Link className="btn btn-azul" to={'/productos/editar/' + _id}>
					<i className="fas fa-pen-alt"></i>
					Editar Producto
				</Link>
				<Link className="btn btn-azul" to={'/productos/imagen/' + _id}>
					<i className="fas fa-pen-alt"></i>
					Editar Imagen
				</Link>
				<button
					type="button"
					className="btn btn-rojo btn-eliminar"
					onClick={() => eliminarProducto(_id)}
				>
					<i className="fas fa-times"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	)
}

export default withRouter(Producto)
