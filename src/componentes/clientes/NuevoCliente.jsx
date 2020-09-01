import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import { validateFields } from '../../helpers/Validator'
import { CRMContext } from '../../context/CRMContext'
import { addCliente } from './handleCliente'
import FormCliente from './FormCliente'

const NuevoCliente = (props) => {
	const [auth] = useContext(CRMContext)
	const [cliente, guardarCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: '',
	})

	const handleChange = (e) => {
		guardarCliente({
			...cliente,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const passed = validateFields(cliente)
		if(passed.valid) {
			addCliente(cliente, auth.token, (res) => {
				if (res.ok) {
					Toast('success', res.msg)
					props.history.push('/clientes')
				} else {
					Toast('warning', res.msg)
				}
			})
		} else {
			return Toast('warning', passed.msg)
		}
	}

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
		<FormCliente 
			action="Agregar cliente"
			titulo="Dar de alta a un nuevo cliente"
			cliente={cliente}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
		/>
	)
}

export default withRouter(NuevoCliente)
