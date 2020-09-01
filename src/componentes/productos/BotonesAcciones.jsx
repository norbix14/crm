import React from 'react'
import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const BotonesAcciones = ({guardarImagen, cancelarImagen}) => (
	<div className={AddAnimClass('fadeInUp')}>
	  <button
	    type="button"
	    className="btn btn-verde"
	    onClick={guardarImagen}
	  >Guardar</button>
	  <button
	    type="button"
	    className="btn btn-rojo"
	    onClick={cancelarImagen}
	  >Cancelar</button>
	</div>
)

BotonesAcciones.propTypes = {
	guardarImagen: PropTypes.func.isRequired,
	cancelarImagen: PropTypes.func.isRequired
}

export default BotonesAcciones
