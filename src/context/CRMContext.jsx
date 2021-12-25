import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const CRMContext = createContext([{}, () => {}])

const CRMProvider = (props) => {
  const token = localStorage.getItem('token') || null
  const logged = !!token

  const initialState = { token, logged }

  const [auth, setAuth] = useState(initialState)

  return (
    <CRMContext.Provider value={[auth, setAuth]}>
      {props.children}
    </CRMContext.Provider>
  )
}

CRMProvider.propTypes = {
  children: PropTypes.any,
}

export { CRMContext, CRMProvider }
