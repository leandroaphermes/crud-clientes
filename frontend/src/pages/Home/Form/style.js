import styled from 'styled-components'

export const Form = styled.form`
`
export const FormGroup = styled.div`
  margin-bottom: 15px;

  .input-mask {
    display: block;
    width: 100%;
    background-color: #DDD;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    box-sizing: border-box;
  }
`

export const Label = styled.label`
  display: block;
  color: #DDD;
  margin-bottom: 3px;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  background-color: #DDD;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  box-sizing: border-box;
`
export const ContainerPhoto = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`

export const Photo = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 2px #000;
  object-fit: cover;
`

export const ContentBtnUpload = styled.div`
  margin-left: 20px;
`

export const ConfirmText = styled.div`
  padding: 20px 0px;
  font-size: 18px;
  text-align: left;
  color: #DDDDDD;

  & > span {
    font-weight: bold;
  }
`
