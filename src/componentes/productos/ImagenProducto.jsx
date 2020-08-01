import React, { useContext, useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function ImagenProducto(props) {
    const idProducto = props.match.params.id
    const [ auth ] = useContext(CRMContext)
    const [ archivo, guardarArchivo ] = useState({})
    const [ imagenprevia, guardarImagenPrevia ] = useState('')
    const [ datosimagen, guardarDatosImagen ] = useState({})
    const [ estadocarga, setEstadoCarga ] = useState(false)
    const [ estadonube, setEstadoNube ] = useState(false)
    const [ progressbar, setProgressBar ] = useState(0)
    
    const leerArchivo = e => {
        const file = e.target.files[0]
        if(file) {
            if((file.type === 'image/jpeg' || 
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
        const urlCloudCred = `/cloud-cred/${file_info}`
        clienteAxios.post(urlCloudCred,
            {
                params: {
                    fileinfo: file_info
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        )
        .then(response => {
            if(response.status === 200) {
                const CLOUDINARY_URL = response.data.datos.url
                const CLOUDINARY_API_KEY = response.data.datos.key
                const CLOUDINARY_SIGNATURE = response.data.datos.signature
                const formData = new FormData()
                formData.append('timestamp', time_stamp)
                formData.append('public_id', public_id)
                formData.append('api_key', CLOUDINARY_API_KEY)
                formData.append('file', file)
                formData.append('signature', CLOUDINARY_SIGNATURE)
                axios.post(CLOUDINARY_URL,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress(e) {
                            setProgressBar(Math.round((e.loaded * 100.0) / e.total))
                        }
                    }
                )
                .then(response => {
                    if(response.status === 200) {
                        guardarDatosImagen(response)
                        setEstadoCarga(false)
                        setEstadoNube(true)
                        Toast('success', 'Imagen cargada')
                    }
                })
                .catch(err => {
                    setEstadoNube(false)
                    Toast('error', 'Error al cargar la imagen')
                })
            }
        })
        .catch(err => {
            if(err.response) {
                if(err.response.data.error) {
                    Toast('warning', err.response.data.mensaje)
                } else {
                    Toast('warning', err.response.data.mensaje)
                }
            } else {
                Toast('error', 'Ha ocurrido un error en la petición')
            }
        })
    }
    
    const guardarImagen = async (id, file) => {
        const { secure_url, public_id, created_at } = file
        const data = {
            secure_url,
            public_id,
            created_at,
            owner: id
        }
		try {
            const url = `/productos/imagen/${id}`
			const nuevoProducto = await clienteAxios.post(url,
                data,
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
				}
			})
			if(nuevoProducto.status === 200) {
				if(nuevoProducto.data) {
					if(nuevoProducto.data.error) {
						Toast('warning', nuevoProducto.data.mensaje)
					} else {
						Toast('success', nuevoProducto.data.mensaje)
						props.history.push('/productos')
					}
				}
			}
		} catch(err) {
            if(err.response) {
                if(err.response.data.error) {
                    Toast('error', err.response.data.mensaje)
                } else {
                    Toast('error', err.response.data.mensaje)
                }
            } else {
                Toast('error', 'Ha ocurrido un error')
            }
		}
    }
    
    const cancelarImagen = publicid => {
        console.log('Borrar imagen de Cloudinary...', publicid)
    }
    
    useEffect(() => {
        const consultarImagen = async () => {
            const url = `/productos/${idProducto}`
            const imagen = await clienteAxios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            if(imagen.status === 200) {
                if(!imagen.data.error) {
                    guardarImagenPrevia(imagen.data.datos)
                } else {
                    guardarImagenPrevia('')    
                }
            } else {
                guardarImagenPrevia('')
            }
        }
        consultarImagen()
    }, [idProducto, auth.token])
    
    if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
    
    return (
        <Fragment>
            <h2>Imagen del producto</h2>
            <form>
                <legend>Elegir imagen para el producto</legend>
                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file" 
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>
                <div className="campo">
                    <label>Imagen actual:</label>
                    {
                        datosimagen.data ? (
                            <img 
                                src={datosimagen.data.secure_url}
                                width="300"
                                alt="Imagen de producto"
                            />
                        ) : (
                            imagenprevia.imagen ? 
                                <img
                                    src={imagenprevia.imagen}
                                    width="300"
                                    alt="Imagen previa"
                                />
                            :   <p>Este producto aún no tiene una imagen</p>
                        )
                    }
                </div>
                <div className="acciones">
                   {
                        estadocarga ? (
                            <Fragment>
                                <button 
                                    type="button" 
                                    className="btn btn-azul"
                                    onClick={cargarImagen}
                                >Cargar</button>
                                <progress 
                                    className="progress-bar" 
                                    value={progressbar}
                                ></progress>
                            </Fragment>
                        ) : null
                    }
                    {
                        estadonube ? (
                            <Fragment>
                                <button 
                                    type="button"
                                    className="btn btn-verde"
                                    onClick={() => guardarImagen(idProducto, datosimagen.data)}
                                >Guardar</button>
                                <button 
                                    type="button" 
                                    className="btn btn-rojo"
                                    onClick={() => cancelarImagen(datosimagen.data.public_id)}
                                >Cancelar</button>
                            </Fragment>
                        ) : null
                    }
                </div>
                
            </form>
        </Fragment>
    )
}

export default withRouter(ImagenProducto)
