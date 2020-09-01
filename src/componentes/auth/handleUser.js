import clienteAxios from '../../config/axios'
import {
	processSuccess,
	processFailure
} from '../../helpers/ProcessResponse'

export const crearUsuario = (usuario, callback) => {
	clienteAxios.post('/crear-cuenta', usuario)
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}

export const iniciarSesion = (credenciales, callback) => {
	clienteAxios.post('/iniciar-sesion', credenciales)
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}
