import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { Toast } from '../../helpers/SweetAlert'
import { cloudinaryCred } from './handleProductImage'

/**
 * Componente para elegir una imagen
 *
 * @param {object} props - component props
 * @param {function} props.setFileData - function to save
 * the file's data
 * @param {function} props.setLoadStatus - function to set
 * the loading status of the file
 */
const ImagenProductoElegir = (props) => {
  const { setFileData, setLoadStatus, setCredentials, token } = props

  const askCredentials = async () => {
    try {
      const public_id = uuid()
      const time_stamp = new Date().getTime()
      const file_info = `public_id=${public_id}&timestamp=${time_stamp}`
      const { data, response = null } = await cloudinaryCred(file_info, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { credentials } = details
      const uploadCredentials = {
        ...credentials,
        time_stamp,
        public_id,
      }
      setCredentials(uploadCredentials)
    } catch (error) {
      setCredentials({})
    }
  }

  const readFileData = async (e) => {
    const { target } = e
    const { files } = target
    const file = files[0]
    if (file) {
      const formats = ['image/jpeg', 'image/png']
      const { type, size } = file
      if (formats.includes(type) && size <= 409600) {
        Toast('success', 'Archivo válido')
        setFileData(file)
        setLoadStatus(true)
        await askCredentials()
      } else {
        setLoadStatus(false)
        return Toast('warning', 'El formato debe ser JPG o PNG y menor a 400kb')
      }
    }
  }

  return (
    <>
      <h2>Imagen del producto</h2>
      <legend>Elegir imagen para el producto</legend>
      <div className="campo">
        <label htmlFor="imagen">Imagen</label>
        <input type="file" name="imagen" id="imagen" onChange={readFileData} />
      </div>
    </>
  )
}

ImagenProductoElegir.propTypes = {
  setFileData: PropTypes.func.isRequired,
  setLoadStatus: PropTypes.func.isRequired,
  setCredentials: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default ImagenProductoElegir
