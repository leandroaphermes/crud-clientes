import React from 'react'
import styled from 'styled-components'

export const ButtonStyled = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${ props => props.danger ? "#F13040" : "#1466FF"};
  color: #DDD;
  cursor: pointer;
  ${ props => props.px0 ? "" : "margin-right: 5px; margin-bottom: 5px;"}
  box-shadow: 0px 0px 2px 0px #2f2d2d;
  ${ props => props.block ? "display: block; width: 100%;" : "" }

  &:hover{
    background-color: ${ props => props.danger ? "#D13040" : "#1254F8"};
    color: #FFF;
  }

  &:disabled {
    cursor: not-allowed;
    filter:  grayscale(100%);
  }
`


const Button = function({ children, ...rest }) {
  return (
    <ButtonStyled {...rest} >
      {children}
    </ButtonStyled>
  )
}

export default Button