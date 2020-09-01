import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import {
  loadImage,
  saveImage,
  deleteImage
} from './handleProducto'
import BotonCarga from './BotonCarga'
import BotonesAcciones from './BotonesAcciones'
import ImagenActual from './ImagenActual'

const ImagenProducto = (props) => {
  const idProducto = props.match.params.id
  const [auth] = useContext(CRMContext)
  const [archivo, guardarArchivo] = useState({})
  const [datosimagen, guardarDatosImagen] = useState({})
  const [estadocarga, setEstadoCarga] = useState(false)
  const [estadonube, setEstadoNube] = useState(false)
  const [progressbar, setProgressBar] = useState(0)

  const leerArchivo = (e) => {
    const file = e.target.files[0]
    if (file) {
      if ((file.type === 'image/jpeg' || 
           file.type === 'image/png') &&
           file.size <= 409600) {
        guardarArchivo(file)
        setEstadoCarga(true)
      } else {
        setEstadoCarga(false)
        Toast('warning', 'El formato debe ser JPG o PNG y menor a 400kb')
        return
      }
    }
  }

  const cargarImagen = () => {
    const file = archivo
    const time_stamp = new Date().getTime()
    const public_id = uuid()
    const file_info = `public_id=${public_id}&timestamp=${time_stamp}`
    loadImage(file_info, auth.token, (res) => {
      if(res.ok) {
        const { url, key, signature } = res.data

        const formData = new FormData()
        formData.append('timestamp', time_stamp)
        formData.append('public_id', public_id)
        formData.append('api_key', key)
        formData.append('file', file)
        formData.append('signature', signature)

        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress(e) {
            setProgressBar(Math.round((e.loaded * 100.0) / e.total))
          }
        })
        .then((response) => {
          if (response.status === 200) {
            guardarDatosImagen(response)
            setEstadoCarga(false)
            setEstadoNube(true)
            Toast('success', 'Imagen cargada')
          }
        })
        .catch((err) => {
          setEstadoNube(false)
          Toast('error', 'Error al cargar la imagen')
        })
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  const guardarImagen = () => {
    const { secure_url, public_id, created_at } = datosimagen.data
    const data = {
      secure_url,
      public_id,
      created_at,
      owner: idProducto,
    }
    saveImage(idProducto, data, auth.token, (res) => {
      if(res.ok) {
        Toast('success', res.msg)
        props.history.push('/productos')
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  const cancelarImagen = () => {
    const { data: { public_id } } = datosimagen
    deleteImage(public_id, auth.token, (res) => {
      if(res.ok) {
        Toast('success', res.msg)
        props.history.push('/productos')
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  if (!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <form>
      <h2>Imagen del producto</h2>
      <legend>Elegir imagen para el producto</legend>
      <div className="campo">
        <label>Imagen</label>
        <input type="file" name="imagen" onChange={leerArchivo} />
      </div>
      <ImagenActual datosimagen={datosimagen} />
      <div className="acciones">
        {
          estadocarga &&
          <BotonCarga 
            cargarImagen={cargarImagen}
            progressbar={progressbar}
          />
        }
        {
          estadonube &&
          <BotonesAcciones
            guardarImagen={guardarImagen}
            cancelarImagen={cancelarImagen}
          />
        }
      </div>
    </form>
  )
}

export default withRouter(ImagenProducto)
