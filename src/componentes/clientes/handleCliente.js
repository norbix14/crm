import clienteAxios from '../../config/axios'
import { ResData } from '../../helpers/ResponseMessages'
import {
  processSuccess, 
  processFailure
} from '../../helpers/ProcessResponse'

export const consultarClientelaDeApi = (id, token, callback) => {
  const url = id.length > 0 ? `/clientes/${id}` : `/clientes`
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

export const addCliente = (cliente, token, callback) => {
  const url = '/clientes'
  clienteAxios.post(url, cliente, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => callback(processSuccess(response)))
  .catch((err) => callback(processFailure(err)))
}

export const editCliente = (id, cliente, token, callback) => {
  const url = `/clientes/${id}`
  clienteAxios.put(url, cliente, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => callback(processSuccess(response)))
  .catch((err) => callback(processFailure(err)))
}

export const deleteCliente = (id, token, callback) => {
  const url = `/clientes/${id}`
  clienteAxios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => callback(processSuccess(response)))
  .catch((err) => callback(processFailure(err)))
}
