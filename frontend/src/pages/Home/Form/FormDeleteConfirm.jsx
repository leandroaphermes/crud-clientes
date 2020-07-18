import React, { useState } from 'react'
import { toast } from 'react-toastify'

import api from '../../../services/api'

import {
  ConfirmText
} from './style'

import ComponentsUIButton from '../../../components/UI/Button/Button'

function FormDeleteConfirm(props) {

  const [btnDisable, setBtnDisable] = useState(false)

  function handleDelete (client_id) {

    setBtnDisable(true)

    api.delete(`/clients/${client_id}`, {
      validateStatus: s => s === 204
    })
    .then( response => {

      toast.success(`Cliente excluido com sucesso`)
      props.toggleModal()
      props.refreshData()


    })
    .catch( dataError => {
      if(dataError.response.data[0]){
        dataError.response.data.forEach( element => {
          toast.error(element.message)
        })
      }else{
        toast.error(dataError.response.data.message)
      }
    })

  }

  return (
    <>
      <ConfirmText>
        Você quer realmente excluir o cadastro de <span>{props.data.name}</span>
      </ConfirmText>
      <ComponentsUIButton
        block
        danger
        onClick={ e => handleDelete(props.data.id)}
        disabled={btnDisable}
      >
        Excluir Cliente
      </ComponentsUIButton>
    </>
  )
}


export default FormDeleteConfirm

