import axios from 'axios'

/**
 * This is an instance of `axios`
 * 
 * @example
 * const { data } = await AxiosRequest({
 * 	url: '/api/users',
 * 	method: 'GET',
 * 	data: {},
 * 	headers: {
 * 		Authorization: 'Bearer ejsnai90DNV9rvn...'
 * 	}
 * })
 * 
*/
const AxiosRequest = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 10000
})

export default AxiosRequest
