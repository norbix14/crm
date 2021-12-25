import PropTypes from 'prop-types'

/**
 * Componente para mostrar un formulario
 *
 * @param {object} props - component props
 * @param {string} props.action - a string with the name
 * of the action like `Add client`, `Save client` for the
 * button
 * @param {object} props.client - client data
 * @param {string} props.title - some title to show in the
 * form
 * @param {function} props.handleSubmit - function to handle the
 * submit event
 * @param {function} props.handleInputChange - function to handle
 * the input change event
 */
const FormCliente = (props) => {
  const { action, client, title, handleSubmit, handleInputChange } = props

  const { nombre, apellido, empresa, email, telefono } = client

  return (
    <form onSubmit={handleSubmit}>
      <legend>{title}</legend>
      <div className="campo">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          placeholder="Nombre Cliente"
          name="nombre"
          id="nombre"
          autoFocus
          required
          onChange={handleInputChange}
          value={nombre}
        />
      </div>
      <div className="campo">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          placeholder="Apellido Cliente"
          name="apellido"
          id="apellido"
          required
          onChange={handleInputChange}
          value={apellido}
        />
      </div>
      <div className="campo">
        <label htmlFor="empresa">Empresa:</label>
        <input
          type="text"
          placeholder="Empresa Cliente"
          name="empresa"
          id="empresa"
          required
          onChange={handleInputChange}
          value={empresa}
        />
      </div>
      <div className="campo">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email Cliente"
          name="email"
          id="email"
          required
          onChange={handleInputChange}
          value={email}
        />
      </div>
      <div className="campo">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          placeholder="Teléfono Cliente"
          name="telefono"
          id="telefono"
          required
          onChange={handleInputChange}
          value={telefono}
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value={action} />
      </div>
    </form>
  )
}

FormCliente.propTypes = {
  action: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default FormCliente
