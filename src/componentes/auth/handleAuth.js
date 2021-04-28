import AxiosRequest from '../../config/axios'
import { internalError } from '../../helpers/ErrorMessages'

/**
 * Function to log in into account
 * 
 * @param {object} data - user data
 * @returns {Promise}
*/
export const login = async (data) => {
  try {
    const result = await AxiosRequest({
      url: '/iniciar-sesion',
      method: 'POST',
      data
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to create a new account
 *
 * @param {object} data - user data
 * @returns {Promise}
*/
export const signup = async (data) => {
  try {
    const result = await AxiosRequest({
      url: '/crear-cuenta',
      method: 'POST',
      data
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}
