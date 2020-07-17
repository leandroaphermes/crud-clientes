import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import { 
  Container, 
  Content,
  ContainerTitleAndBtnAdd,
  Title,
  ContainerResults,
  RowResultItem,
  RowResultColumn,
  Photo,
  TextEmpty,
} from './style'

import FormNewRegister from './Form/FormNewRegister'

import ComponentsUIButton from '../../components/UI/Button/Button'
import ComponentsUIModal from '../../components/UI/Modal/Modal'

import IconUser from '../../assets/svg/user.svg'

export default function Home() {

  const [modalRegister, setModalRegister] = useState(true)
  const [clients, setClients] = useState([])

  function handleEdit(client_id){
  }
  function handleDelete(client_id){
  }

  useEffect(() => {
    
    api.get("/clients", {
      validateStatus: s => s === 200
    })
    .then( response => {

      setClients(response.data)

    })
    .catch( error => {
      console.log(error)
    })
    
  }, [])

  return (
    <Container>
      <Content>

        <ComponentsUIModal
          visible={modalRegister}
          toogleModal={ e => setModalRegister(!modalRegister) }
          title="Novo Registro"
          size="sm"
        >
          <FormNewRegister />
        </ComponentsUIModal>

        <ContainerTitleAndBtnAdd>
          <Title>Cadastro de Clientes</Title>
          <ComponentsUIButton onClick={() => setModalRegister(!modalRegister)} >Novo Registro</ComponentsUIButton>
        </ContainerTitleAndBtnAdd>

        <ContainerResults>

          { clients.length > 0 ? (

            clients.map( client => (
              <RowResultItem key={client.id}>

                <RowResultColumn width="10%">
                  <Photo src={ client.photo_url ? client.photo_url : IconUser } />
                </RowResultColumn>

                <RowResultColumn>
                  {client.name}
                </RowResultColumn>

                <RowResultColumn>
                  {`${client.cpf}`.replace( /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/ , "$1.$2.$3-$4") }
                </RowResultColumn>


                <RowResultColumn>
                  { `${client.phone}`.replace( /([0-9]{2})([0-9]{5})([0-9]{4})/ , "($1) $2-$3") }
                </RowResultColumn>

                <RowResultColumn>
                  <ComponentsUIButton 
                    primary
                    onClick={e => handleEdit(client.id)}
                  >
                    Editar
                  </ComponentsUIButton>
                  <ComponentsUIButton 
                    danger
                    onClick={e => handleDelete(client.id)}
                  >
                    Deletar
                  </ComponentsUIButton>
                </RowResultColumn>

              </RowResultItem>
              ) 
            )
          ) : (
            <TextEmpty>Não há resultados</TextEmpty>
          )}

        </ContainerResults>
      </Content>
    </Container>
  )
}
