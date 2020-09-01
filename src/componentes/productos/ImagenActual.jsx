import React from 'react'
import PropTypes from 'prop-types'

const ImagenActual = ({datosimagen}) => (
  <div className="campo">
    <label>Imagen actual</label>
    {
      datosimagen.data ?
        <img
          width="300"
          alt="Imagen de producto"
          src={datosimagen.data.secure_url}
        />
      : <p>Este producto aún no tiene una imagen</p>
    }
  </div>
)

ImagenActual.propTypes = {
	datosimagen: PropTypes.object
}

export default ImagenActual
