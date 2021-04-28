import { useState } from 'react'
import PropTypes from 'prop-types'
import { Toast } from '../../helpers/SweetAlert'
import { searchProduct } from './handleOrders'

/**
 * Componente que muestra un formulario para buscar un producto
 * 
 * @param {object} props - component props
 * @param {string} props.token - authorization token
 * @param {function} props.addProductToList - add a new product
 * to the list of existing products
*/
const FormBuscarProducto = (props) => {
  const { token, addProductToList } = props

  const [ options, setOptions ] = useState([])
  const [ query, setQuery ] = useState('')

  const handleInputSearch = async (e) => {
    const { target } = e
    const { value } = target
    if (value.length > 5) {
      try {
        const { data } = await searchProduct(value, token)
        const { details } = data
        const { product } = details
        setOptions(product)
      } catch (error) {
        setOptions([])
      }
    }
    setQuery(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {
        data,
        response = null
      } = await searchProduct(query, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { product } = details
      if (product.length <= 0) {
        return Toast(
          'warning',
          'No se encontró ningún producto'
        )
      }
      return addProductToList(product[0])
    } catch (error) {
      return Toast('warning', 'Ha ocurrido un error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>Busca un producto y agrega una cantidad</legend>
      <div className="campo">
        <label htmlFor="productos">Productos:</label>
        <input
          type="text"
          placeholder="Nombre del producto"
          name="productos"
          id="productos"
          list="sugerencias"
          onChange={handleInputSearch}
        />
      </div>
      <datalist id="sugerencias">
        {
          options.length > 0 ? 
            options.map(opt => (
              <option
                key={opt._id}
                value={opt.nombre}
              />
            ))
          : <option value="Escribe tu búsqueda" />
        }
      </datalist>
      <input
        type="submit"
        value="Buscar"
        className="btn btn-azul btn-block"
      />
    </form>
  )
}

FormBuscarProducto.propTypes = {
  token: PropTypes.string,
  addProductToList: PropTypes.func.isRequired
}

export default FormBuscarProducto
