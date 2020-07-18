'use strict'

class StoreClient {
  get rules () {
    return {
      cpf: `number|min:10|existsUpdate:clients,cpf,id,${this.ctx.request.params.id}`,
      name: "string|min:6|max:64",
      phone: `number|min:10|existsUpdate:clients,phone,id,${this.ctx.request.params.id}`
    }
  }
  get validateAll () {
    return true
  }
}

module.exports = StoreClient
