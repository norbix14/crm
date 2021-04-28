import AxiosRequest from '../../config/axios'
import { internalError } from '../../helpers/ErrorMessages'

/**
 * Function to find all clients
 * 
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findClients = async (token) => {
  try {
    const result = await AxiosRequest({
      url: '/clientes',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to find a client by it's `_id`
 *
 * @param {string} idClient - client `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findClient = async (idClient, token) => {
  try {
    const result = await AxiosRequest({
      url: `/clientes/${idClient}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to add a new client
 *
 * @param {object} data - client data
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const addClient = async (data, token) => {
  try {
    const result = await AxiosRequest({
      url: `/clientes`,
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to update an existing client by it's `_id`
 *
 * @param {string} idClient - client `_id`
 * @param {object} data - new and fresh client's data
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const editClient = async (idClient, data, token) => {
  try {
    const result = await AxiosRequest({
      url: `/clientes/${idClient}`,
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to delete an existing client by it's `_id`
 *
 * @param {string} idClient - client `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const deleteClient = async (idClient, token) => {
  try {
    const result = await AxiosRequest({
      url: `/clientes/${idClient}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}
