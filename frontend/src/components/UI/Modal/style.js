import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const Content = styled.div`
  width: 100%;
  max-width: ${ props => props.size === "lg" ? "900px" : props.size === "sm" ? "400px" : "700px" };
  background-color: #2d2d2d;
  border-radius: 10px;
`
export const ContainerTitle = styled.div`
  color: #DDD;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255, 0.05);
`
export const Title = styled.div`
  padding: 15px 10px;
`
export const ButtonClose = styled.button`
  border: none;
  font-size: 26px;
  font-weight: 700;
  background-color: transparent;
  padding: 2px 15px;
  color: #AAAAAA;
`
export const ContainerBody = styled.div`
  padding: 15px 10px;
  box-sizing: border-box;
`