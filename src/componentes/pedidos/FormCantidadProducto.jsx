import {
	useCallback,
	useEffect,
	useState
} from 'react'
import PropTypes from 'prop-types'

/**
 * Componente que muestra datos del producto y permite
 * realizar acciones con dicho producto
 * 
 * @param {object} props - component props
 * @param {object} props.product - product data
 * @param {function} props.setProducts - function to
 * set and update the state
*/
const FormCantidadProducto = (props) => {
	const {
		product,
		setProducts
	} = props

	const initialState = {
		...product,
		producto: product._id,
		cantidad: 0
	}

	const [ quantity, setQuantity ] = useState(0)
	const [
		currentproduct,
		setCurrentProduct
	] = useState(initialState)
	const [ confirmed, setConfirm ] = useState(false)

	const { _id, nombre, precio } = currentproduct

	const deleteProduct = () => {
		setProducts((prevState) => {
			return prevState.filter(
				(element) => element._id !== _id
			)
		})
	}

	const handleQuantityClick = (e) => {
		setConfirm(false)
		const { target } = e
		const { classList } = target
		if (classList.contains('plus-one-product')) {
			setQuantity((prevState) => {
				return prevState + 1
			})
		}
		if (classList.contains('minus-one-product')) {
			setQuantity((prevState) => {
				if (prevState === 0) {
					return 0
				}
				return prevState - 1
			})
		}
	}

	const updateCurrentProduct = useCallback(() => {
		setCurrentProduct((prevState) => {
			return {
				...prevState,
				cantidad: quantity
			}
		})
	}, [quantity])

	const handleConfirmClick = () => {
		setConfirm(true)
		setProducts(prevState => {
			return prevState.map(
				(product) => {
					if (product._id === _id) {
						return {
							...product,
							...currentproduct
						}
					}
					return product
				}
			)
		})
	}

	useEffect(() => {
		updateCurrentProduct()
	}, [updateCurrentProduct])

	return (
		<li>
			<div className="texto-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">${precio}.-</p>
			</div>
			<div className="acciones">
				<div className="contenedor-cantidad">
					<i
						className="fas fa-minus minus-one-product"
						onClick={handleQuantityClick}
					></i>
					<p className="quantity">{quantity}</p>
					<i 
						className="fas fa-plus plus-one-product" 
						onClick={handleQuantityClick}
					></i>
				</div>
				<button
					type="button"
					className="btn btn-verde"
					disabled={confirmed}
					onClick={handleConfirmClick}
				><i className="fas fa-check-circle"></i>
					Confirmar
				</button>
				<button
					type="button"
					className="btn btn-rojo"
					onClick={deleteProduct}
				><i className="fas fa-minus-circle"></i>
					Eliminar Producto
				</button>
			</div>
		</li>
	)
}

FormCantidadProducto.propTypes = {
	product: PropTypes.object.isRequired,
	setProducts: PropTypes.func.isRequired
}

export default FormCantidadProducto
