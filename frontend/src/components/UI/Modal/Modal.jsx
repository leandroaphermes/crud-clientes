import React from 'react'
import PropTypes from 'prop-types'

import { FaTimes } from "react-icons/fa";

import {
  Container,
  Content,
  ContainerTitle,
  ContainerBody,
  Title,
  ButtonClose
} from './style'


function Modal(props) {


  function handleClose(e) {
    if(!e.target.classList.contains('modal') ) return 
    props.toggleModal()
  }

  return (
    props.visible && (
      <Container className="modal"  onClick={handleClose}>
        <Content size={props.size ? props.size : "md"} >
          <ContainerTitle>
            <Title>{props.title}</Title>
            <ButtonClose onClick={props.toggleModal}>
              <FaTimes />
            </ButtonClose>
          </ContainerTitle>
          <ContainerBody>
            {props.children}
          </ContainerBody>
        </Content>
      </Container>

    )
  )
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  size: PropTypes.oneOf( [ "sm", "lg"]),
}

export default Modal

