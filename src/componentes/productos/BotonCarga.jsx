import { useState } from 'react'
import PropTypes from 'prop-types'
import { AddAnimClass } from '../../helpers/AddAnimateClass'
import { Toast } from '../../helpers/SweetAlert'
import { uploadToCloudinary } from './handleProductImage'

/**
 * Componente que se encarga de cargar la imagen a Cloudinary
 * 
 * @param {object} props - component props
 * @param {object} props.credentials - credentials needed
 * to load image to Cloudinary
 * @param {object} props.filedata - file data
 * @param {function} props.setImageData - function to set 
 * the image data
 * @param {function} props.setLoadStatus - function to set 
 * the loading status
 * @param {function} props.setCloudLoaded - function to set 
 * the cloudinary loading status
*/
const BotonCarga = (props) => {
	const {
		credentials,
		filedata,
		setImageData,
		setLoadStatus,
		setCloudLoaded
	} = props

	const [ progressbar, setProgressBar ] = useState(0)

	const loadImage = async () => {
		try {
			if (Object.keys(credentials).length <= 0) {
				return Toast(
					'warning',
					'Intente más tarde debido a un error'
				)
			}
			const {
				url,
				key,
				signature,
				time_stamp,
				public_id
			} = credentials
			const formData = new FormData()
			formData.append('timestamp', time_stamp)
			formData.append('public_id', public_id)
			formData.append('api_key', key)
			formData.append('file', filedata)
			formData.append('signature', signature)
			const {
				data,
				response = null
			} = await uploadToCloudinary(url, formData)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { message } = data
			setProgressBar(100)
			setImageData(data)
			setLoadStatus(false)
			setCloudLoaded(true)
			return Toast('success', message)
		} catch (error) {
			return Toast(
				'error',
				'Ha ocurrido un error al cargar la imagen'
			)
		}
	}

	return (
		<div className={AddAnimClass('fadeInUp')}>
			<button
				type="button"
				className="btn btn-azul"
				onClick={loadImage}
			>Cargar</button>
			<progress
				className="progress-bar"
				value={progressbar}
				title={
					progressbar === 100 ?
						'Imagen cargada' :
						'Presiona Cargar para cargar imagen'
				}
			></progress>
		</div>
	)
}

BotonCarga.propTypes = {
	credentials: PropTypes.object.isRequired,
	filedata: PropTypes.object.isRequired,
	setImageData: PropTypes.func.isRequired,
	setLoadStatus: PropTypes.func.isRequired,
	setCloudLoaded: PropTypes.func.isRequired
}

export default BotonCarga
