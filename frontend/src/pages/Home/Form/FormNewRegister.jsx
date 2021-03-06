import React,{ useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import InputMask from "react-input-mask";
import { FaPlus } from 'react-icons/fa'

import api from '../../../services/api'

import {
  Form,
  FormGroup,
  Label,
  Input,
  ContainerPhoto,
  Photo,
  ContentBtnUpload,
} from './style'

import ComponentsUIButton from '../../../components/UI/Button/Button'

import IconUser from '../../../assets/svg/user.svg'

export default function FormNewRegister(props) {

  const refInputFile = useRef(null)
  const [btnDisable, setBtnDisable] = useState(true)
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const [fileImage, setFileImage] = useState({})
  const [urlImage, setUrlImage] = useState("")

  function handleSubmit (e){
    e.preventDefault()

    setBtnDisable(true)

    const formData = new FormData()
    if(fileImage && fileImage.name && fileImage.name !== "") formData.append("photo", fileImage)
    
    formData.append("name", name)
    formData.append("cpf", cpf.replace(/[^0-9]+/g, ""))
    formData.append("phone", phone.replace(/[^0-9]+/g, ""))

    api.post(`/clients`, formData, {
      validateStatus: s => s === 201
    })
    .then( response => {

      toast.success(`Cliente cadastrado com sucesso`)
      props.refreshData()
      props.toggleModal()

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

  function handleName(name){
    setName(name)
  }
  function handleCpf(cpf){
    setCpf(cpf)
  }
  function handlePhone(phone){
    setPhone(phone)
  }
  function handleFileImage(files){
    if(files.length === 1){
      setFileImage(files[0])
    }else{
      setFileImage({})
    }
  }

  useEffect( ()=> {

    if(
      name !== "" && 
      cpf !== "" && 
      phone !== "" 
    ){
      setBtnDisable(false)
    }else{
      setBtnDisable(true)
    }

  }, [ name, cpf, phone ])

  useEffect(() => {
    if(fileImage.name){
      
      const url = URL.createObjectURL(fileImage)
      setUrlImage(url)

      return () => {
        if(url) {
          URL.revokeObjectURL(url)
          setUrlImage("")
        }
      }
    }

  }, [fileImage])

  return (
    <Form onSubmit={handleSubmit}>

      <ContainerPhoto>
        
        <Photo src={ urlImage ? urlImage : IconUser} />

        <ContentBtnUpload>
          <input 
            type="file" 
            hidden={true}
            accept="image/gif, image/png, image/jpeg, image/jpg"
            ref={refInputFile}
            onChange={e => handleFileImage(e.target.files)}
          />
          <ComponentsUIButton 
            px0="true"
            type="button"
            onClick={ e => refInputFile.current.click() }
          >
            {urlImage ? "Alterar" : "Adicionar"} Imagem
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
      
      <ComponentsUIButton block disabled={btnDisable} >
        <FaPlus /> Cadastar
      </ComponentsUIButton>
    </Form>
  )
}
