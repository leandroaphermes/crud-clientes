import React,{ useState, useEffect } from 'react'

import {
  Form,
  FormGroup,
  Label,
  Input
} from './style'

import ComponentsUIButton from '../../../components/UI/Button/Button'

export default function FormNewRegister() {

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")

  function handleName(name){
    setName(name)
  }
  function handleCpf(cpf){
    setCpf(cpf)
  }
  function handlePhone(phone){
    setPhone(phone)
  }

  return (
    <Form>
      <FormGroup>
        <Label htmlFor="name">Nome:</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={e => handleName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="cpf">CPF:</Label>
        <Input 
          id="cpf"
          type="text"
          value={cpf}
          onChange={e => handleCpf(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phone">Telefone:</Label>
        <Input
          id="phone"
          type="text"
          value={phone}
          onChange={e => handlePhone(e.target.value)}
        />
      </FormGroup>
      <ComponentsUIButton block >
        Registrar
      </ComponentsUIButton>
    </Form>
  )
}
