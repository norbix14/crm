const passed = (valid = true, msg = 'valid') => {
	return { valid, msg }
}

export const validateFields = fields => {
	if(typeof fields !== 'object') {
		return passed(false, 'Se requiere un objeto')
	}
	const len = Object.keys(fields).length || fields.length
	if(len <= 0) {
		return passed(false, 'No hay campos que validar')
	}
	const values = Object.values(fields) || fields
	for(let i = len - 1; i >= 0; i--) {
		if(String(values[i]).trim() === '') {
			return passed(false, 'No dejar campos vacíos')
		}
	}
	return passed()
}

export const validateField = field => {
	if(field === null || field === undefined) {
		return passed(false, 'Proporcionar un valor válido')
	}
	if((typeof field === 'string') || 
	   (typeof field === 'number')) {
		if(String(field).trim() === '') {
			return passed(false, 'No dejar el campo vacío')
		}
		if(Number(field) < 0) {
			return passed(false, 'No se admiten valores negativos')
		}
		return passed()
	} else {
		return passed(false, 'Solo se valida en texto o número')
	}
}
