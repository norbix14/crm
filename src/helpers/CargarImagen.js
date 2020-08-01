// optimizar
export function cargarImagen = (params = {}) => {
    const { archivo, publicid, authToken } = params
    // carga la imagen en cloudinary y guarda los datos de la imagen
    const file = archivo
    const time_stamp = new Date().getTime()
    const public_id = publicid
    const file_info = `public_id=${public_id}&timestamp=${time_stamp}`
    const urlCloudCred = `/cloud-cred/${file_info}`
    clienteAxios.post(urlCloudCred,
        {
            params: {
                fileinfo: file_info
            }
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    )
    .then(response => {
        if (response.status === 200) {
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
                if (response.status === 200) {
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
        if (err.response) {
            if (err.response.data.error) {
                Toast('warning', err.response.data.mensaje)
            } else {
                Toast('warning', err.response.data.mensaje)
            }
        } else {
            Toast('error', 'Ha ocurrido un error en la petición')
        }
    })
}
