import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

/**
 * Componente para mostrar cantidad de resultados
 *
 * @param {object} props - component props
 * @param {number} props.len - items quantity
*/
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
