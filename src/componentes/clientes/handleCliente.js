import clienteAxios from '../../config/axios'

const processSuccess = response => {
    let result = {
        ok: false,
        msg: ''
    }
    if(response.status === 200) {
        result.ok = true
        if(response.data.error) {
            if(response.data.error.code === 11000) {
                result.msg = 'Este email ya esta registrado'
            } else {
                result.msg = 'No se ha podido realizar la operación'
            }
        } else {
            result.msg = response.data.mensaje
        }
    }
    return result
}

const processFailure = err => {
    let result = {
        ok: false,
        msg: ''
    }
    if(err.response) {
        result.ok = false
        if(err.response.data.status === 500) {
            result.msg = err.response.data.mensaje
        } else {
            result.msg = err.response.data.mensaje
        }
    } else {
        result.msg = 'Ha ocurrido un error'
    }
    return result
}

export const consultarClientelaDeApi = (id, token, callback) => {
    let result = {
        ok: false,
        msg: '',
        data: []
    }
    let url = id.length > 0 ? `/clientes/${id}` : `/clientes`
    clienteAxios.get(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {
        if(response.status === 200) {
            if(!response.data.error) {
                result.ok = true
                result.msg = 'Estos son los datos encontrados'
                result.data = response.data.datos
            }
        }
        return callback(result)
    })
    .catch(err => {
        result.ok = false
        result.msg = 'No se ha encontrado nada'
        return callback(result)
    })
}

export const addCliente = (cliente, token, callback) => {
    clienteAxios.post('/clientes',
        cliente,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => callback(processSuccess(response)))
    .catch(err => callback(processFailure(err)))
}

export const editCliente = (id, cliente, token, callback) => {
    clienteAxios.put(`/clientes/${id}`,
        cliente,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => callback(processSuccess(response)))
    .catch(err => callback(processFailure(err)))
}

export const deleteCliente = (id, token, callback) => {
    clienteAxios.delete(`/clientes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => callback(processSuccess(response)))
    .catch(err => callback(processFailure(err)))
}
