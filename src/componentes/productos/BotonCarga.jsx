import React from 'react'
import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const BotonCarga = ({cargarImagen, progressbar}) => (
	<div className={AddAnimClass('fadeInUp')}>
	  <button
	    type="button"
	    className="btn btn-azul"
	    onClick={cargarImagen}
	  >Cargar</button>
	  <progress className="progress-bar" value={progressbar}></progress>
	</div>
)

BotonCarga.propTypes = {
	cargarImagen: PropTypes.func.isRequired,
	progressbar: PropTypes.number.isRequired
}

export default BotonCarga
