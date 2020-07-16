'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RequiredParameterException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = RequiredParameterException
