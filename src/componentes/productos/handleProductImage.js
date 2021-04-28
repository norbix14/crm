import AxiosRequest from '../../config/axios'
import { internalError } from '../../helpers/ErrorMessages'

/**
 * Function to save product's image data in MongoDB
 * 
 * @param {string} idProduct - product `_id`
 * @param {object} data - image data
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const saveImageData = async (idProduct, data, token) => {
  try {
    const result = await AxiosRequest({
      url: `/productos/imagen/${idProduct}`,
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
 * Function to ask credentials from the Cloudinary cloud
 * 
 * @param {string} fileinfo - some information of the file
 * in the format of URL params like 
 * `public_id=publicid&timestamp=123456789`
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const cloudinaryCred = async (fileinfo, token) => {
  try {
    const result = await AxiosRequest({
      url: `/cloud-cred/${fileinfo}`,
      method: 'POST',
      params: { fileinfo },
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
 * Function to load the image to the Cloudinary cloud
 * 
 * @param {string} url - URL of the Cloudinary cloud
 * @param {object} data - file data to load
 * @returns {Promise}
*/
export const uploadToCloudinary = async (url, data) => {
  try {
    const result = await AxiosRequest({
      baseURL: url,
      data,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return result
  } catch (error) {
    return internalError(error)
  }
}

/**
 * Function to delete an image from the Cloudinary
 * database by it's `public_id`
 * 
 * @param {string} publicid - `public_id` of the image
 * @param {string} token - authorization token
 * @returns {Promise}
*/
export const deleteImageFromCloudinary = async (publicid, token) => {
  try {
    const result = await AxiosRequest({
      url: `/productos/imagen/${publicid}`,
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
