/**
 * Function to check a repeated element
 *
 * @param {Array<object>} prevState - a previous state
 * @param {object} product - product data
*/
export const checkRepeated = (prevState, product) => {
  let repeated = false
  const unique = prevState.map(
    (el) => {
      if (el._id === product._id) {
        repeated = true
        return {
          ...el,
          ...product
        }
      }
      repeated = false
      return el
    }
  )
  if (repeated) {
    return [
      ...unique
    ]
  }
  return [
    ...unique,
    product
  ]
}

/**
 * Function to calculate a total
 *
 * @param {Array<object>} element - an array
 *
*/
export const calculateTotal = (element) => {
  if (element.length === 0) {
    return 0
  }
  let newTotal = 0
  const calcPrice = (obj) => {
    const { cantidad, precio } = obj
    if (!cantidad || !precio) {
      return 0
    }
    return parseFloat(
      Number(cantidad) * Number(precio)
    )
  }
  element.forEach(el => newTotal += calcPrice(el))
  return Number(newTotal.toFixed(2))
}
