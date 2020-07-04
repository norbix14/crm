import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import { CRMContext } from '../../context/CRMContext'

function Header(props) {
	const [ auth, guardarAuth ] = useContext(CRMContext)
	const cerrarSesion = () => {
		guardarAuth({
			token: '',
			auth: false
		})
		localStorage.setItem('token', '')
		localStorage.removeItem('token')
		localStorage.clear()
		Toast('success', 'Sesión cerrada. Vuelve cuando quieras!')
		props.history.push('/iniciar-sesion')
	}
	return (
		<header className="barra">
		    <div className="contenedor">
		    	<div className="contenido-barra">
			        <h1>CRM - Administrador de Clientes</h1>
			        {auth.auth ? (
			    		<button type="button" className="btn btn-rojo"
			    				onClick={cerrarSesion}>
			    			<i className="far fa-times-circle"></i>
			    			Cerrar sesión
						</button>
			        ) : null}
		    	</div>
		    </div>
		</header>
	)
}

export default withRouter(Header)
