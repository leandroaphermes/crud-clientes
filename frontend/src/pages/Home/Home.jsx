import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import api from '../../services/api'

import { 
  Container, 
  Content,
  ContainerTitleAndBtnAdd,
  Title,
  ContainerResults,
  ContentSearch,
  ShowCountResults,
  InputSearch,
  RowResultItem,
  RowResultColumn,
  RowResultColumnActions,
  Photo,
  TextEmpty
} from './style'

import FormNewRegister from './Form/FormNewRegister'
import FormEditRegister from './Form/FormEditRegister'
import FormDeleteConfirm from './Form/FormDeleteConfirm'

import ConponentsUIPagination from '../../components/UI/Pagination/Pagination'
import ComponentsUIButton from '../../components/UI/Button/Button'
import ComponentsUIModal from '../../components/UI/Modal/Modal'

import IconUser from '../../assets/svg/user.svg'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {

  const history = useHistory()
  const { searchRouter } = useParams()
  const [modalRegister, setModalRegister] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [search, setSearch] = useState( searchRouter ? searchRouter : "")
  const [clients, setClients] = useState({
    total: 0,
    perPage: 0,
    page: 0,
    lastPage: 0,
    data: []
  })
  const [actionClient, setActionClient] = useState({})

  let query = useQuery();
  const page = query.get("page") || 1

  function handleClickEdit(client_id){
    const client = clients.data.find( item => item.id === client_id)
    setActionClient(client)
    setModalEdit(!modalEdit)
  }
  function handleClickDelete(client_id){
    const client = clients.data.find( item => item.id === client_id)
    setActionClient(client)
    setModalDelete(!modalDelete)
  }
  
  function handleSearch(search){
    setSearch(search)
    history.push(`/${search}`)
  }

  function refreshData(){
    api.get(`/clients/?search=${search}&page=${page}`,{
      validateStatus: s => s === 200
    })
    .then( response => {
      setClients(response.data)
    })
    .catch( dataError => toast.error('Try again later'))
  }

  useEffect(() => {
    const id = setTimeout(() => {
      api.get(`/clients/?search=${search}&page=${page}`,{
        validateStatus: s => s === 200
      })
      .then( response => {
        if(response.data.lastPage === 1 && page !== 1){
          history.push(`/${search}`)
        }
        setClients(response.data)
      })
      .catch( dataError => toast.error('Try again later'))
    }, 800)
    return () => {
        clearInterval(id)
    }
  }, [search, page, history])


  return (
    <Container>
      <Content>

        {/* Modal Create */}
        <ComponentsUIModal
          visible={modalRegister}
          toggleModal={ () => setModalRegister(!modalRegister) }
          title="Novo Cadastro"
          size="sm"
        >
          <FormNewRegister 
            toggleModal={ () => setModalRegister(!modalRegister) }
            refreshData={refreshData}
          />
        </ComponentsUIModal>

        {/* Modal Delete */}
        <ComponentsUIModal
          visible={modalDelete}
          toggleModal={ () => setModalDelete(!modalDelete) }
          title="Excluir Cadastro"
          size="sm"
        >
          <FormDeleteConfirm 
            toggleModal={ () => setModalDelete(!modalDelete) }
            refreshData={refreshData}
            data={actionClient}
          />
        </ComponentsUIModal>

        {/* Modal Edit */}
        <ComponentsUIModal
          visible={modalEdit}
          toggleModal={ () => setModalEdit(!modalEdit) }
          title="Editar Cadastro"
          size="sm"
        >
          <FormEditRegister 
            toggleModal={ () => setModalEdit(!modalEdit) }
            refreshData={refreshData}
            data={actionClient}
          />
        </ComponentsUIModal>
        
        <ContainerTitleAndBtnAdd>
          <Title>Cadastro de Clientes</Title>
          <ComponentsUIButton onClick={() => setModalRegister(!modalRegister)} >
            <FaPlus /> Novo Cadastro
          </ComponentsUIButton>
        </ContainerTitleAndBtnAdd>
        
        
        {/* Start Container Results */}
        <ContainerResults>
          
          <ContentSearch>
            <ShowCountResults>{clients.total} Resultados</ShowCountResults>
            <InputSearch
              placeholder="Buscar"
              value={search}
              onChange={ e => handleSearch(e.target.value)}
            />
          </ContentSearch>

          { clients.data.length > 0 ? (

            <>
            {/* Start Map */}
            {clients.data.map( client => (
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

                <RowResultColumnActions>
                  <ComponentsUIButton
                    type="button"
                    primary
                    onClick={e => handleClickEdit(client.id)}
                    title="Editar Cliente"
                  >
                    <FaEdit />
                  </ComponentsUIButton>
                  
                  <ComponentsUIButton
                    type="button"
                    danger
                    onClick={e => handleClickDelete(client.id)}
                    title="Exclir Cliente"
                  >
                    <FaTrash />
                  </ComponentsUIButton>
                </RowResultColumnActions>

              </RowResultItem>
              ) 
            )}
            {/* End Map */}

            {clients.lastPage > 1 ? (
              <ConponentsUIPagination 
                currentPage={clients.page}
                totalPages={clients.lastPage}
                step={3}
              />
            ) : ""}
            </>

          ) : (
            <TextEmpty>Não há resultados</TextEmpty>
          )}
        </ContainerResults>
        {/* End Container Results */}
      </Content>
    </Container>
  )
}
