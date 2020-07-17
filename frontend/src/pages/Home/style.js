import styled from 'styled-components'

export const Container = styled.div`
  background-color: #191515;
  height: 100vh;
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 100px;
`

export const ContainerTitleAndBtnAdd = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h1`
  font-size: 32px;
  color: #FAFAFAFA;
  text-align: center;
`

export const ContainerResults = styled.div`
  margin-top: 30px;
  background-color: #3A3A3A;
  border-radius: 10px;
`

export const RowResultItem = styled.div`
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255,255, 0.080)
  }
`

export const RowResultColumn = styled.div`
  width: ${props => props.width ? props.width : "100%;"};
  padding: 10px;
  color: #DDD;
`

export const RowResultColumnActions = styled.div`
  width: ${props => props.width ? props.width : "100%;"};
  padding: 10px;
  color: #DDD;
  text-align: center;
`
export const Photo = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 2px #000;
`
export const TextEmpty = styled.p`
  text-align: center;
  font-size: 20px;
  color: #999999;
  padding: 20px 0px;
`
