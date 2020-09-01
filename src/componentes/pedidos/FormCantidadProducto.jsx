import React from 'react'
import PropTypes from 'prop-types'

const FormCantidadProducto = (props) => {
	const {
		producto,
		restarProductos,
		sumarProductos,
		eliminarProductoPedido,
		index,
	} = props

	const { nombre, precio, cantidad } = producto

	return (
		<li>
			<div className="texto-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">${precio}.-</p>
			</div>
			<div className="acciones">
				<div className="contenedor-cantidad">
					<i
						className="fas fa-minus"
						onClick={() => restarProductos(index)}
					></i>
					<p>{cantidad}</p>
					<i 
						className="fas fa-plus" 
						onClick={() => sumarProductos(index)}
					></i>
				</div>
				<button
					type="button"
					className="btn btn-rojo"
					onClick={() => eliminarProductoPedido(producto._id)}
				><i className="fas fa-minus-circle"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	)
}

FormCantidadProducto.propTypes = {
	producto: PropTypes.object.isRequired,
	restarProductos: PropTypes.func.isRequired,
	sumarProductos: PropTypes.func.isRequired,
	eliminarProductoPedido: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
}

export default FormCantidadProducto
