import { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

/**
 * Componente para mostrar una pantalla de bienvenida
 * 
 * @param {object} props - component props
*/
const Home = (props) => {
  const [ auth ] = useContext(CRMContext)

  const { logged } = auth

  const { history } = props

  if(!logged) {
    history.push('/iniciar-sesion')
  }

  return (
    <div className={AddAnimClass('fadeInUp')}>
      <h2>Home</h2>
      <h3>Aquí puedes manejar a tus clientes</h3>
    </div>
  )
}

export default withRouter(Home)
