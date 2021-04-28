/**
 * This function returns an error object
 * 
 * @param {object} error - error data
 * @param  {...any} others - additional data
 * @returns {object}
 * 
 * @example
 * const task = async () => {
 *  try {
 *   const result = await someAsyncTask()
 *   return result
 *  } catch (error) {
 *   return internalError(error)
 *  }
 * }
*/
export const internalError = (error, ...others) => {
  return {
    status: 500,
    data: {
      message: 'Ha ocurrido un error'
    },
    ...error,
    ...others
  }
}
