import { useState } from 'react'

/**
 * Custom hook to handle input text change
 * 
 * Returns a stateful value, and a function to update it
 * 
 * @param {string} initialState - initial state
 * @returns {Array<string, function>}
*/
export default function useInputTextChange(initialState = '') {
  const [ state, setState ] = useState(initialState)

  const handleInputTextChange = (e) => {
  	e.persist()
    setState(e.target.value)
  }

  return [ state, handleInputTextChange ]
}
