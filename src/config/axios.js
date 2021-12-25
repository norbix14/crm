import axios from 'axios'

/**
 * This is an instance of `axios`
 * 
 * @example
 * const { status, data } = await AxiosRequest({
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
	baseURL: 'https://desolate-ocean-01790.herokuapp.com',
	timeout: 10000
})

export default AxiosRequest
