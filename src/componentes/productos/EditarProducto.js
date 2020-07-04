import React, { useContext, useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function EditarProducto(props) {
	const { id } = props.match.params
	const [ auth ] = useContext(CRMContext)
	const [ producto, guardarProducto] = useState({
		nombre: '',
		precio: '',
		imagen: ''
	})
	const [ archivo, guardarArchivo ] = useState('')
	const { nombre, precio, imagen } = producto
	const leerInfoProducto = e => {
		guardarProducto({
			...producto,
			[e.target.name]: e.target.value
		})
	}
	const leerArchivo = e => {
		guardarArchivo(e.target.files[0])
	}
	const actualizarProducto = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('nombre', producto.nombre)
		formData.append('precio', producto.precio)
		formData.append('imagen', archivo)
		try {
			const url = `/productos/${id}`
			const actualizar = await clienteAxios.put(url,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			if(actualizar.status === 200) {
				if(actualizar.data) {
					if(actualizar.data.error) {
						Toast('warning', 'No se ha podido actualizar')
					} else {
						Toast('success', actualizar.data.mensaje)
						props.history.push('/productos')
					}
				}
			}
		} catch(err) {
			Toast('error', 'Ha ocurrido un error')
		}
	}
	useEffect(() => {
		async function consultarAPI() {
			const url = `/productos/${id}`
			const obtenerProducto = await clienteAxios.get(url,
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			guardarProducto(obtenerProducto.data)
		}
		consultarAPI()
	}, [id, auth.token])
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
	return (
	    <Fragment>
			<h2>Editar producto</h2>
			<form onSubmit={actualizarProducto}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    	   name="nombre" required 
                    	   onChange={leerInfoProducto}
                    	   defaultValue={nombre}
                   	/>
                </div>
                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" 
                    	   placeholder="Precio" required 
                    	   onChange={leerInfoProducto}
                    	   defaultValue={precio}
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
					{
						imagen ? (
							<img src={process.env.REACT_APP_BACKEND_URL + imagen} 
								alt="Imagen de producto" 
								width="300" 
							/>
                   		) : null
					}
                    <input type="file" name="imagen" 
                    	   onChange={leerArchivo}
                    />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" 
                    	   value="Actualizar Producto" 
                    />
                </div>
            </form>
		</Fragment>
	)
}

export default withRouter(EditarProducto)
