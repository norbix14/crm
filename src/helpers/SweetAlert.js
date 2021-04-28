import Swal from 'sweetalert2'

/**
 * Funcion para mostrar una alerta modal
 *
 * @param {string} icon - icon for the modal alert
 * @param {string} title - the title of the modal alert
*/
export const Toast = (icon = 'success', title = 'Correcto') => {
	const toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})
	icon = icon.toLowerCase()
	return toast.fire({ icon, title })
}

/**
 * Funcion para mostrar una alerta preguntando
 * la confirmacion de la accion
 *
 * @param {function} callback - callback function
*/
export const SwalDelete = (callback) => {
	Swal.fire({
		title: '¿Estas seguro?',
		text: 'Esto no se puede revertir',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, borrar',
		cancelButtonText: 'No, cancelar',
	})
	.then((result) => {
		if (result.isConfirmed) {
			return callback()
		}
	})
}
