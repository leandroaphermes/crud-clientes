'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

const NotFoundException = use('App/Exceptions/NotFoundException')
const RequiredParameterException = use('App/Exceptions/RequiredParameterException')
const { ModelNotFoundException } = require('@adonisjs/lucid/src/Exceptions')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { response, session }) {

    if (error.name === 'ValidationException') {
      return response.status(422).send(error.messages)

    }else if(error instanceof RequiredParameterException){
      return response.badRequest({
        message: error.message
      })

    }else if(error instanceof NotFoundException){
      return response.notFound({
        message: error.message
      })

    }else{
      console.log(error);
      response.internalServerError()
    }
    return super.handle(...arguments)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
