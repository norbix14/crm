import PropTypes from 'prop-types'

/**
 * Componente que muestra el formulario
 * 
 * @param {object} props - component props
 * @param {string} props.title - some title for the form
 * @param {string} props.action - a string explaining the action
 * like `Add product`, `Edit product`, etc
 * @param {object} props.defaultVal - some default value
 * @param {function} props.handleSubmit - function to handle the submit event
 * @param {function} props.handleInputChange - function to handle the change event
*/
const FormProducto = (props) => {
	const {
		title, 
		action,
		defaultVal,
		handleSubmit, 
		handleInputChange
	} = props

	return (
		<form onSubmit={handleSubmit}>
		  <legend>{title}</legend>
		  <div className="campo">
		    <label htmlFor="nombre">Nombre:</label>
		    <input
		      type="text"
		      placeholder="Nombre Producto"
		      name="nombre"
					id="nombre"
		      required
		      onChange={handleInputChange}
		      value={defaultVal?.nombre}
		    />
		  </div>
		  <div className="campo">
		    <label htmlFor="precio">Precio:</label>
		    <input
		      type="number"
		      name="precio"
					id="precio"
		      min="0.00"
		      step="0.01"
		      placeholder="Precio"
		      required
		      onChange={handleInputChange}
		      value={defaultVal?.precio}
		    />
		  </div>
		  {
		  	defaultVal?.imagen && 
			  	<div className="campo">
	          <label htmlFor="">Imagen actual:</label>
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
	title: PropTypes.string.isRequired, 
	action: PropTypes.string.isRequired,
	defaultVal: PropTypes.object,
	handleSubmit: PropTypes.func.isRequired, 
	handleInputChange: PropTypes.func.isRequired
}

export default FormProducto
