import React from 'react'
import PropTypes from 'prop-types'

const FormProducto = (props) => {
	const {
		titulo, 
		action,
		defaultVal,
		handleSubmit, 
		handleChange
	} = props

	return (
		<form onSubmit={handleSubmit}>
		  <legend>{titulo}</legend>
		  <div className="campo">
		    <label>Nombre:</label>
		    <input
		      type="text"
		      placeholder="Nombre Producto"
		      name="nombre"
		      required
		      onChange={handleChange}
		      value={defaultVal?.nombre}
		    />
		  </div>
		  <div className="campo">
		    <label>Precio:</label>
		    <input
		      type="number"
		      name="precio"
		      min="0.00"
		      step="0.01"
		      placeholder="Precio"
		      required
		      onChange={handleChange}
		      value={defaultVal?.precio}
		    />
		  </div>
		  {
		  	defaultVal?.imagen && 
			  	<div className="campo">
	          <label>Imagen actual:</label>
	          <img 
	          	alt="Imagen de producto" 
	          	width="300" 
	          	src={defaultVal.imagen} 
	          />
	        </div>
		  }
		  <div className="enviar">
		    <input
		      type="submit"
		      className="btn btn-azul"
		      value={action}
		    />
		  </div>
		</form>
	)
}

FormProducto.propTypes = {
	titulo: PropTypes.string.isRequired, 
	action: PropTypes.string.isRequired,
	defaultVal: PropTypes.object,
	imagen: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired, 
	handleChange: PropTypes.func.isRequired
}

export default FormProducto
