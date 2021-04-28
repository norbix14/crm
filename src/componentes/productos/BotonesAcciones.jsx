import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'
import { Toast } from '../../helpers/SweetAlert'
import {
	saveImageData,
	deleteImageFromCloudinary
} from './handleProductImage'

/**
 * Componente que muestra acciones a realizar con la imagen
 * 
 * @param {object} props - component props
 * @param {string} props.token - authorization token
 * @param {object} props.imagedata - image data
 * @param {string} props.idProduct - product `_id`
*/
const BotonesAcciones = (props) => {
	const {
		token,
		imagedata,
		idProduct,
		history
	} = props

	const saveImage = async () => {
		try {
			const imageMetadata = {
				...imagedata,
				owner: idProduct
			}
			const {
				data,
				response = null
			} = await saveImageData(idProduct, imageMetadata, token)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { message } = data
			Toast('success', message)
			history.push('/productos')
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}

	const cancelImage = async () => {
		try {
			const { public_id } = imagedata
			const {
				data,
				response = null
			} = await deleteImageFromCloudinary(public_id, token)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { message } = data
			Toast('success', message)
			history.push('/productos')
		} catch (error) {
			return Toast('warning', 'Ha ocurrido un error')
		}
	}

	return (
		<div className={AddAnimClass('fadeInUp')}>
			<button
				type="button"
				className="btn btn-verde"
				onClick={saveImage}
			>Guardar</button>
			<button
				type="button"
				className="btn btn-rojo"
				onClick={cancelImage}
			>Cancelar</button>
		</div>
	)
}

BotonesAcciones.propTypes = {
	token: PropTypes.string.isRequired,
	imagedata: PropTypes.object.isRequired,
	idProduct: PropTypes.string.isRequired
}

export default withRouter(BotonesAcciones)
