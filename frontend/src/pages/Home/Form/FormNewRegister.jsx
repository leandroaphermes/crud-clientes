import React,{ useState, useEffect } from 'react'
import InputMask from "react-input-mask";
import { FaPlus } from 'react-icons/fa'

import {
  Form,
  FormGroup,
  Label,
  Input,
  ContainerPhoto,
  ContentPhoto,
  Photo,
  ContentBtnUpload,
} from './style'

import ComponentsUIButton from '../../../components/UI/Button/Button'

import IconUser from '../../../assets/svg/user.svg'

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

      <ContainerPhoto>
        
        <Photo src={IconUser} />

        <ContentBtnUpload>
          <ComponentsUIButton px0="true">
            Adicionar Imagem
          </ComponentsUIButton>
        </ContentBtnUpload>

      </ContainerPhoto>

      <FormGroup>
        <Label htmlFor="name">Nome:</Label>
        <Input
          id="name"
          type="text"
          placeholder="Fulano da Silva"
          minLength="6"
          maxLength="64"
          value={name}
          onChange={e => handleName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="cpf">CPF:</Label>
        <InputMask 
          id="cpf" 
          className="input-mask"
          placeholder="___.___.___-__" 
          mask="999.999.999-99" 
          onChange={e => handleCpf(e.target.value)} value={cpf} 
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phone">Telefone:</Label>
        <InputMask 
          id="phone" 
          className="input-mask"
          placeholder="(__) _____-____" 
          mask="(99) 99999-9999" 
          onChange={e => handlePhone(e.target.value)} value={phone} 
        />
      </FormGroup>
      
      <ComponentsUIButton block >
        <FaPlus /> Registrar
      </ComponentsUIButton>
    </Form>
  )
}
