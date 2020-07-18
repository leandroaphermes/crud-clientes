import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import {
  ContainerNav,
  Ul,
  Li,
} from './style'

function Pagination({ totalPages, currentPage, step = 3 }) {

  const location  = useLocation()
  let linksBack = [ ]
  let linksNext = [ ]
  let url = `${location.pathname}${location.search}`

  if(! /page=[0-9]+/.test(url) ) {
    url+= location.search ? "&page=1" : "?page=1"
  }

  for (let index = currentPage - step; index < currentPage; index++) {
    if(index >= 1){
      linksBack.push(<Li key={`b${index}`}><Link to={`${url.replace(/page=[0-9]+/, `page=${index}`)}`} title={`Ir para pagina ${index}`} >{index}</Link></Li>)
    }
  }
  for (let index = (currentPage+1); index < (currentPage+1) + step; index++) {
    if(index <= totalPages){
      linksNext.push(<Li key={`n${index}`}><Link to={`${url.replace(/page=[0-9]+/, `page=${index}`)}`} title={`Ir para pagina ${index}`} >{index}</Link></Li>)
    }
  }

  return (
    <ContainerNav>
      <Ul>

        <Li>
          <Link to={`${url.replace(/page=[0-9]+/, `page=1`)}`} title="Ir para primeira pagina" ><FaAngleLeft /></Link>
        </Li>

        {linksBack}
        <Li>
          <Link className={`active`} to={`${url.replace(/page=[0-9]+/, `page=${currentPage}`)}`} title={`Ir para ${currentPage}`} >{currentPage}</Link>
        </Li>
        {linksNext}

        <Li>
          <Link to={`${url.replace(/page=[0-9]+/, `page=${totalPages}`)}`} title="Ir para ultima pagina" ><FaAngleRight /></Link>
        </Li>

      </Ul>
    </ContainerNav>
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
}

export default Pagination

