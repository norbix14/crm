import { useState } from 'react'

/**
 * Custom hook to handle input change
 * 
 * Returns a stateful value, and a function to update it
 * 
 * @param {object} initialState - the initial state
 * 
 * @example
 * const [ values, handleInputChange, setValues ] = useHandlerInputChange({})
*/
export default function useHandlerInputChange(initialState = {}) {
	const [ state, setState ] = useState(initialState)

	const handleInputChange = (e) => {
		e.persist()
		setState(prevState => {
			return {
				...prevState,
				[e.target.name]: e.target.value
			}
		})
	}

	return [ state, handleInputChange, setState ]
}
