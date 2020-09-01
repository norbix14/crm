import clienteAxios from '../../config/axios'
import { ResData } from '../../helpers/ResponseMessages'
import {
	processSuccess, 
	processFailure
} from '../../helpers/ProcessResponse'

export const addProduct = (data, token, callback) => {
	clienteAxios.post('/productos', data, {
	  headers: {
	    Authorization: `Bearer ${token}`
	  }
	})
	.then((response => callback(processSuccess(response))))
	.catch((err) => callback(processFailure(err)))
}

export const editProduct = (id, data, token, callback) => {
	const url = `/productos/${id}`
	clienteAxios.put(url, data, {
	  headers: {
	    Authorization: `Bearer ${token}`
	  }
	})
	.then((response => callback(processSuccess(response))))
	.catch((err) => callback(processFailure(err)))
}

export const deleteProduct = (idProducto, token, callback) => {
	const url = `/productos/${idProducto}`
	clienteAxios.delete(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}

export const consultarProductosApi = (token, callback) => {
	clienteAxios.get('/productos', {
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

export const consultarProductoApi = (id, token, callback) => {
	const url = `/productos/${id}`
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

export const loadImage = (fileinfo, token, callback) => {
	const urlCloudCred = `/cloud-cred/${fileinfo}`
	clienteAxios.post(urlCloudCred,
		{
		  params: { fileinfo }
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

export const saveImage = (id, data, token, callback) => {
	const url = `/productos/imagen/${id}`
	clienteAxios.post(url, data, {
	  headers: {
	    Authorization: `Bearer ${token}`
	  }
	})
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}

export const deleteImage = (id, token, callback) => {
	const url = `/productos/imagen/${id}`
	clienteAxios.delete(url, {
	  headers: {
	    Authorization: `Bearer ${token}`
	  }
	})
	.then((response) => callback(processSuccess(response)))
	.catch((err) => callback(processFailure(err)))
}
