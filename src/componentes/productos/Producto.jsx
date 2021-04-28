import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast, SwalDelete } from '../../helpers/SweetAlert'
import { deleteProduct } from './handleProducts'

/**
 * Componente que muestra datos de un producto
 * 
 * @param {object} props - component props
 * @param {object} props.product - product data
*/
const Producto = (props) => {
	const [ auth ] = useContext(CRMContext)

	const { token, logged } = auth

	const {
		product,
		updateProductList,
		history
	} = props

	if (!logged) {
		history.push('/iniciar-sesion')
	}

	const { _id, nombre, precio, imagen } = product

	const handleDeleteClick = () => {
		SwalDelete(async () => {
			try {
				const {
					data,
					response = null
				} = await deleteProduct(_id, token)
				if (response) {
					const { data } = response
					const { message } = data
					return Toast('warning', message)
				}
				const { message } = data
				updateProductList(_id)
				return Toast('success', message)
			} catch (error) {
				return Toast('error', 'Ha ocurrido un error')
			}
		})
	}

	return (
		<li className="producto">
			<div className="info-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">${precio}.-</p>
				{
					imagen && 
					<img
						alt="Imagen de producto"
						loading="lazy"
						title={`Imagen de ${nombre}`}
						src={`${imagen}?tr=w-400,h-300,bl-30,q-50`}
					/>
				}
			</div>
			<div className="acciones">
				<Link 
					className="btn btn-azul" 
					to={'/productos/editar/' + _id}
				><i className="fas fa-pen-alt"></i>
					Editar Producto
				</Link>
				{
					!imagen &&
						<Link 
							className="btn btn-azul" 
							to={'/productos/imagen/' + _id}
						><i className="fas fa-pen-alt"></i>
							Editar Imagen
						</Link>
				}
				<button
					type="button"
					className="btn btn-rojo btn-eliminar"
					onClick={handleDeleteClick}
				><i className="fas fa-times"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	)
}

Producto.propTypes = {
	product: PropTypes.object.isRequired
}

export default withRouter(Producto)
