'use strict'

class StoreClient {
  get rules () {
    return {
      cpf: "required|number|min:10|exists:clients,cpf",
      name: "required|string|min:6|max:64",
      phone: "required|number|min:10|exists:clients,phone"
    }
  }
  get validateAll () {
    return true
  }
}

module.exports = StoreClient