import AxiosRequest from '../../config/axios'
import { internalError } from '../../helpers/ErrorMessages'

/**
 * Function to add a new product
 * 
 * @param {object} data - product data
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const addProduct = async (data, token) => {
	try {
		const result = await AxiosRequest({
			url: '/productos',
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
 * Function to update a product by it's `_id`
 * 
 * @param {string} idProduct - product `_id`
 * @param {object} data - new and fresh product's data
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const editProduct = async (idProduct, data, token) => {
	try {
		const result = await AxiosRequest({
			url: `/productos/${idProduct}`,
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
 * Function to delete a product by it's `_id`
 * 
 * @param {string} idProduct - product `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const deleteProduct = async (idProduct, token) => {
	try {
		const result = await AxiosRequest({
			url: `/productos/${idProduct}`,
			method: 'DELETE',
			params: {
				idProducto: idProduct
			},
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
 * Function to find all products
 * 
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findProducts = async (token) => {
	try {
		const result = await AxiosRequest({
			url: '/productos',
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
 * Function to find a product by it's `_id`
 * 
 * @param {string} idProduct - product `_id`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const findProduct = async (idProduct, token) => {
	try {
		const result = await AxiosRequest({
			url: `/productos/${idProduct}`,
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
