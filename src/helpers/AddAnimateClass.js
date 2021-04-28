/**
 * Funcion para agregar una animacion mediante una clase
 *
 * @param {string} effect - the effect
 * @return {string}
*/
export const AddAnimClass = (effect = 'bounce') => {
	return ` animate__animated animate__${effect} `
}
