import PropTypes from 'prop-types'

/**
 * Componente que muestra datos de un articulo
 * 
 * @param {object} props - component props
 * @param {object} props.element - an element with data
 * @param {number} props.index - auxiliar index
*/
const Articulo = (props) => {
  const { element, index } = props

  const { _id, cantidad, producto } = element

  const checkProduct = (product) => {
    return {
      ...product,
      nombre: product?.nombre || 'Artículo sin nombre',
      precio: product?.precio || 'Artículo sin precio'
    }
  }

  const checkedProduct = checkProduct(producto)

  const { nombre, precio } = checkedProduct

  if (producto === null) {
    return <li key={index}>Artículo eliminado del stock</li>
  }

  return (
    <li key={_id}>
      <p>Artículo: {nombre}</p>
      <p>Precio: {precio}</p>
      <p>Cantidad: {cantidad}</p>
    </li>
  )
}

Articulo.propTypes = {
  element: PropTypes.object.isRequired,
  index: PropTypes.number
}

export default Articulo
