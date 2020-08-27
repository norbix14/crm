import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function Pedido({ pedido, history }) {
	const [auth] = useContext(CRMContext)

	const { cliente } = pedido

	const clientName = (client) => {
		let nombreCompleto
		if (client !== null) {
			nombreCompleto = `${client.nombre} ${client.apellido}`
		} else {
			nombreCompleto = 'No existe el cliente'
		}
		return nombreCompleto
	}

	const eliminarPedido = (idPedido) => {
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
				const url = `/pedidos/${idPedido}`
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
							Toast('error', err.response.data.mensaje)
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
		<li className="pedido">
			<div className="info-pedido">
				<p className="id">ID: {pedido._id}</p>
				<p className="nombre">Cliente: {clientName(cliente)}</p>
				<div className="articulos-pedido">
					<p className="productos">Artículos del pedido:</p>
					<ul>
						{pedido.pedido.map((articulo, i) =>
							articulo.producto !== null ? (
								<li key={pedido._id + articulo.producto._id}>
									<p>Artículo: {articulo.producto.nombre}</p>
									<p>Precio: ${articulo.producto.precio}.-</p>
									<p>Cantidad: {articulo.cantidad}</p>
								</li>
							) : (
								<li key={i}>Articulo eliminado del stock</li>
							)
						)}
					</ul>
				</div>
				<p className="total">Total: ${pedido.total}.-</p>
			</div>
			<div className="acciones">
				<button
					type="button"
					className="btn btn-rojo btn-eliminar"
					onClick={() => eliminarPedido(pedido._id)}
				>
					<i className="fas fa-times"></i>
					Eliminar Pedido
				</button>
			</div>
		</li>
	)
}

export default withRouter(Pedido)
