export const ResMsg = (ok = false, msg = '') => {
	return { ok, msg }
}

export const ResData = (ok = false, msg = '', data = []) => {
	return { ok, msg, data }
}
