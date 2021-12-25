import { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import BotonCarga from './BotonCarga'
import BotonesAcciones from './BotonesAcciones'
import ImagenActual from './ImagenActual'
import ImagenProductoElegir from './ImagenProductoElegir'

/**
 * Componente que realiza acciones con una imagen para
 * un producto
 *
 * @param {object} props - component props
 */
const ImagenProducto = () => {
  const [auth] = useContext(CRMContext)
  const { id } = useParams()

  const { token, logged } = auth

  const [filedata, setFileData] = useState({})
  const [imagedata, setImageData] = useState({})
  const [loadstatus, setLoadStatus] = useState(false)
  const [cloudloaded, setCloudLoaded] = useState(false)
  const [credentials, setCredentials] = useState({})

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <form>
      <ImagenProductoElegir
        setFileData={setFileData}
        setLoadStatus={setLoadStatus}
        setCredentials={setCredentials}
        token={token}
      />
      <ImagenActual imagedata={imagedata} />
      <div className="acciones">
        {loadstatus && (
          <BotonCarga
            credentials={credentials}
            filedata={filedata}
            setImageData={setImageData}
            setLoadStatus={setLoadStatus}
            setCloudLoaded={setCloudLoaded}
          />
        )}
        {cloudloaded && (
          <BotonesAcciones token={token} imagedata={imagedata} idProduct={id} />
        )}
      </div>
    </form>
  )
}

export default ImagenProducto
