import Swal from 'sweetalert2'

const Toast = (icon = 'success', title = 'Acción realizada') => {
	const ToastFire = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})
	icon = icon.toLowerCase()
	return ToastFire.fire({ icon, title })
}

export default Toast
