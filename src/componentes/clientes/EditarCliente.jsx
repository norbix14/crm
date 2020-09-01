import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import { validateFields } from '../../helpers/Validator'
import { editCliente, consultarClientelaDeApi } from './handleCliente'
import FormCliente from './FormCliente'

const EditarCliente = (props) => {
	const { id } = props.match.params
	const [auth] = useContext(CRMContext)
	const [cliente, datosCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: '',
	})

	const handleChange = (e) => {
		datosCliente({
			...cliente,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const passed = validateFields(cliente)
		if(passed.valid) {
			editCliente(cliente._id, cliente, auth.token, (res) => {
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

	useEffect(() => {
		if (auth.token !== '') {
			consultarClientelaDeApi(id, auth.token, (res) => {
				if (res.ok) {
					datosCliente(res.data)
				} else {
					Toast('warning', res.msg)
				}
			})
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [id, auth.token, props.history])

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
	  <FormCliente 
			action="Editar cliente"
			titulo="Editar datos del cliente"
			cliente={cliente}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
		/>
	)
}

export default withRouter(EditarCliente)
