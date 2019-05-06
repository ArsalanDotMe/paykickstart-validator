import _ from 'lodash'
import CryptoJS from 'crypto-js'

export type IPNRequestBody = {
  [key: string]: string | number
}

export function createValidationString(data: IPNRequestBody, secretKey: string) {
  if (!secretKey) {
    throw new Error('secretKey is required!')
  }
  const filteredKeys = Object.keys(data)
    .filter(k => data[k] && data[k] !== '0')
    .filter(k => k !== 'verification_code')

  const ans = _(filteredKeys)
    .map((k, i) => ({ v: data[k], i: String(i) }))
    .sortBy('i')
    .map(o => o.v)
    .value()
    .join('|')

  const hmac = CryptoJS.HmacSHA1(ans, secretKey)
  const hmacStr = hmac.toString(CryptoJS.enc.Hex)

  return hmacStr
}

export function validateIPN(data: IPNRequestBody, secretKey: string) {
  return createValidationString(data, secretKey) === data.verification_code
}

export default validateIPN
