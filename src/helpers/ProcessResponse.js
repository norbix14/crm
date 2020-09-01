import { ResMsg } from './ResponseMessages'

export const processSuccess = (response) => {
  const { data: { mensaje } } = response
  return ResMsg(true, mensaje)
}

export const processFailure = (err) => {
  if (err.response) {
    const { data: { mensaje } } = err.response
    return ResMsg(false, mensaje)
  }
  return ResMsg(false, 'Ha ocurrido un error')
}
