import clienteAxios from '../../config/axios'

export const iniciarSesion = async credenciales => {
    let resultado = {
        ok: false,
        msg: ''
    }
    try {
        const obtenerUsuario = await clienteAxios.post('/iniciar-sesion', credenciales)
        if(obtenerUsuario.status === 200) {
            const { token } = obtenerUsuario.data
            resultado.ok = true
            resultado.msg = token
        }
    } catch(err) {
        resultado.ok = false
        if(err.response) {
            resultado.msg =  err.response.data.mensaje
        } else {
            resultado.msg = 'Ha ocurrido un error. Intente más tarde'
        }
    }
    return resultado
}
