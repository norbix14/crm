import React, { useContext, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'

const Home = (props) => {
    const [ auth ] = useContext(CRMContext)
    
    if(!auth.auth) {
        props.history.push('/iniciar-sesion')
    }
    
    return (
        <Fragment>
            <h2>Home</h2>
            <h3>Mostrar gráficos</h3>
        </Fragment>
    )
}

export default withRouter(Home)
