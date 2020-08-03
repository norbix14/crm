import React, { Fragment, useContext, useState, useEffect } from 'react'
import Toast from '../../helpers/Toast'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { editCliente, consultarClientelaDeApi } from './handleCliente'

function EditarCliente(props) {
	const { id } = props.match.params
	const [ auth ] = useContext(CRMContext)
	const [ cliente, datosCliente ] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: ''
	})
    
	const actualizarState = e => {
		datosCliente({
			...cliente,
			[e.target.name]: e.target.value
		})
	}
    
	const validarCliente = () => {
		const { nombre, apellido, empresa, email, telefono } = cliente
		let valido = !nombre.length || !apellido.length || 
					 !empresa.length || !email.length || 
					 !telefono.length
		return valido
	}
    
    const handleSubmit = e => {
        e.preventDefault()
        editCliente(cliente._id, cliente, auth.token, res => {
            if(res.ok) {
                Toast('success', res.msg)
				props.history.push('/clientes')
            } else {
                Toast('warning', res.msg)
            }
        })
    }
	
    useEffect(() => {
		if(auth.token !== '') {
            consultarClientelaDeApi(id, auth.token, res => {
                if(res.ok) {
                    datosCliente(res.data)
                } else {
                    Toast('warning', res.msg)
                }
            })
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [id, auth.token, props.history])
    
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
    
	return (
	    <Fragment>
		    <h2>Editar Cliente</h2>
		    <form onSubmit={handleSubmit}>
		        <legend>Llena todos los campos</legend>
		        <div className="campo">
		            <label>Nombre:</label>
		            <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre" 
                        autoFocus 
                        required 
                        onChange={actualizarState}
                        value={cliente.nombre}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Apellido:</label>
		            <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        required 
                        onChange={actualizarState}
                        value={cliente.apellido}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Empresa:</label>
		            <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        required 
                        onChange={actualizarState}
                        value={cliente.empresa}
		            />
		        </div>
		        <div className="campo">
		            <label>Email:</label>
		            <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        required 
                        onChange={actualizarState}
                        value={cliente.email}
		            />
		        </div>
		        <div className="campo">
		            <label>Teléfono:</label>
		            <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        required 
                        onChange={actualizarState}
                        value={cliente.telefono}
		            />
		        </div>
		        <div className="enviar">
		            <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Guardar cambios" 
                        disabled={validarCliente()}
					/>
		        </div>
		    </form>
	    </Fragment>
	)
}

export default withRouter(EditarCliente)
