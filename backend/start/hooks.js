'use strict';

const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {

  const Antl = use('Antl');
  const Validator = use('Validator');
  const Database = use('Database');

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
      */
      return
    }
  
    const [table, column] = args

    const row = await Database.table(table).where(column, value).first()
    if (row) {
      throw message
    }
  }
  const existsUpdateFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
      */
      return
    }
    
    
    const [table, column, column2, value2] = args
    
    message = Antl.formatMessage("validation.value_exist_db", { field: column })


    if(column2 && value2){
      const row = await Database.table(table)
        .where(column, value)
        .whereNot(column2, value2)
        .first()

        if (row) {
          throw message
        }
    }else{
      const row = await Database.table(table)
        .where(column, value)
        .first()

      if (row) {
        throw message
      }
    }

    
  }

  Validator.extend('exists', existsFn);
  Validator.extend('existsUpdate', existsUpdateFn);
});