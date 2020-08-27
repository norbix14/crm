import React from 'react'
import PropTypes from 'prop-types'

function FormBuscarProducto({buscarProducto, leerDatosBusqueda}) (
  <form onSubmit={buscarProducto}>
    <legend>Busca un producto y agrega una cantidad</legend>
    <div className="campo">
      <label>Productos:</label>
      <input
        type="text"
        placeholder="Nombre del producto"
        name="productos"
        onChange={leerDatosBusqueda}
      />
    </div>
    <input type="submit" value="Buscar" className="btn btn-azul btn-block" />
  </form>
)

FormBuscarProducto.propTypes = {
  buscarProducto: PropTypes.func.isRequired,
  leerDatosBusqueda: PropTypes.func.isRequired,
}

export default FormBuscarProducto
