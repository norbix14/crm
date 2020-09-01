import React from 'react'
import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const Resultados = ({len}) => {
	if(len <= 0) return null
	return (
		<span className={AddAnimClass('flash')}>({len} hasta ahora)</span>
	)
}

Resultados.propTypes = {
	len: PropTypes.number
}

export default Resultados
