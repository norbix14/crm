import clienteAxios from '../../config/axios'
import { ResData } from '../../helpers/ResponseMessages'
import {
	processSuccess, 
	processFailure
} from '../../helpers/ProcessResponse'

export const consultarClienteDeApi = (id, token, callback) => {
	const url = `/clientes/${id}`
  clienteAxios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
  	const { data: { mensaje, datos } } = response
    return callback(ResData(true, mensaje, datos))
  })
  .catch((err) => {
  	if(err.response) {
	  	const { data: { mensaje } } = err.response
	    return callback(ResData(false, mensaje, []))
  	}
  	return callback(ResData(false, 'Ha ocurrido un error', []))
  })
}

export const searchProduct = (query, token, callback) => {
	const url = `/productos/busqueda/${query}`
  clienteAxios.post(url,
	  {
	    params: { query }
	  },
	  {
	    headers: {
	      Authorization: `Bearer ${token}`
	    }
	  }
  )
  .then((response) => {
  	const { data: { mensaje, datos } } = response
  	return callback(ResData(true, mensaje, datos))
  })
  .catch((err) => {
  	if(err.response) {
	  	const { data: { mensaje } } = err.response
	  	return callback(ResData(false, mensaje, []))	
  	}
  	return callback(ResData(false, 'Ha ocurrido un error', []))
  })
}

export const searchOrders = (token, callback) => {
	clienteAxios.get('/pedidos', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	.then((response) => {
		const { data: { mensaje, datos } } = response
		return callback(ResData(true, mensaje, datos))
	})
	.catch((err) => {
		if(err.response) {
			const { data: { mensaje } } = err.response
			return callback(ResData(false, mensaje, []))
		}
		return callback(ResData(false, 'Ha ocurrido un error', []))
	})
}

export const addOrder = (id, pedido, token, callback) => {
	const url = `/pedidos/nuevo/${id}`
  clienteAxios.post(url, pedido, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => callback(processSuccess(response)))
  .catch((err) => callback(processFailure(err)))
}

export const deleteOrder = (idPedido, token, callback) => {
	const url = `/pedidos/${idPedido}`
	clienteAxios.delete(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}
