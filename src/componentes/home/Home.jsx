import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const Home = (props) => {
  const [ auth ] = useContext(CRMContext)

  if(!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <div className={AddAnimClass('fadeInUp')}>
      <h2>Home</h2>
      <h3>Echa un vistazo</h3>
    </div>
  )
}

export default withRouter(Home)
