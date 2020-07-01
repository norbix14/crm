import React, { useContext, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function NuevoProducto(props) {
	const [ auth ] = useContext(CRMContext)
	const [ producto, guardarProducto] = useState({
		nombre: '',
		precio: ''
	})
	const [ archivo, guardarArchivo ] = useState('')
	const leerInfoProducto = e => {
		guardarProducto({
			...producto,
			[e.target.name]: e.target.value
		})
	}
	const leerArchivo = e => {
		guardarArchivo(e.target.files[0])
	}
	const validarProducto = () => {
		const { nombre, precio } = producto
		let valido = !nombre.length || !precio.length
		return valido
	}
	const agregarProducto = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('nombre', producto.nombre)
		formData.append('precio', producto.precio)
		formData.append('imagen', archivo)
		try {
			const nuevoProducto = await clienteAxios.post('/productos',
			    formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${auth.token}`
				}
			})
			if(nuevoProducto.status === 200) {
				if(nuevoProducto.data) {
					if(nuevoProducto.data.error) {
						Toast('error', 'Ha ocurrido un error')
					} else {
						Toast('success', nuevoProducto.data.mensaje)
						props.history.push('/productos')
					}
				}
			}
		} catch(err) {
			Toast('error', 'Ha ocurrido un error')
		}
	}
	if(!auth.auth && (localStorage.getItem('token') === auth.token)) {
		props.history.push('/iniciar-sesion')
	}
	return (
		<Fragment>
			<h2>Nuevo Producto</h2>
			<form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    	   name="nombre" required 
                    	   onChange={leerInfoProducto}
                   	/>
                </div>
                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" 
                    	   placeholder="Precio" required 
                    	   onChange={leerInfoProducto}
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" 
                    	   onChange={leerArchivo}
                    />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" 
                    	   value="Agregar Producto" 
                    	   disabled={validarProducto()}
                    />
                </div>
            </form>
		</Fragment>
	)
}

export default withRouter(NuevoProducto)
