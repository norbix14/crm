import PropTypes from 'prop-types'

/**
 * Componente que muestra la imagen actual
 * 
 * @param {object} props - component props
 * @param {object} props.imagedata - image data
 * like `public_url` and other properties
*/
const ImagenActual = ({imagedata}) => {
  const imageExists = !!Object.keys(imagedata).length

  return (
    <div className="campo">
      <label>Imagen actual</label>
      {
        imageExists ?
          <img
            width="300"
            alt="Imagen de producto"
            src={imagedata.secure_url}
          />
        : <p>Este producto aún no tiene una imagen</p>
      }
    </div>
  )
}

ImagenActual.propTypes = {
	imagedata: PropTypes.object
}

export default ImagenActual
