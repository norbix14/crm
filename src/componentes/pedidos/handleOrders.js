import AxiosRequest from '../../config/axios'
import { internalError } from '../../helpers/ErrorMessages'

/**
 * Function to find a particular client by it's `_id`
 * 
 * @param {string} idClient - client `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findClientData = async (idClient, token) => {
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
 * Function to find a product
 * 
 * @param {string} query - search query
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const searchProduct = async (query, token) => {
	try {
		const result = await AxiosRequest({
			url: `/productos/busqueda/${query}`,
			method: 'POST',
			params: { query },
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
 * Function to find all orders
 * 
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findOrders = async (token) => {
	try {
		const result = await AxiosRequest({
			url: '/pedidos',
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
 * Function to add a new order
 * 
 * @param {string} idClient - client `_id` 
 * @param {object} data - order data 
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const addOrder = async (idClient, data, token) => {
	try {
		const result = await AxiosRequest({
			url: `/pedidos/nuevo/${idClient}`,
			data,
			method: 'POST',
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
 * Function to delete an order by it's `_id`
 *
 * @param {string} idOrder - order `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const deleteOrder = async (idOrder, token) => {
	try {
		const result = await AxiosRequest({
			url: `/pedidos/${idOrder}`,
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
