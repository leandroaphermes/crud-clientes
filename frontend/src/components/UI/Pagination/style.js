import styled from 'styled-components'

export const ContainerNav = styled.nav`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`
export const Ul = styled.ul`
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > li:first-child > a {
    border-radius: 5px 0px 0px 5px;
    border-right: 2px solid rgba( 0, 0, 0, 0.1);
    padding: 10px 7px;
  }
  & > li:last-child > a {
    border-radius: 0px 5px 5px 0px;
    border-left: 2px solid rgba( 0, 0, 0, 0.1);
    padding: 10px 7px;
  }
`

export const Li = styled.li`

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: rgba(255,255,255, 0.1);
    text-decoration: none;
    color: #DDDDDD;
  }

  & > a:hover {
    background-color: rgba(255,255,255, 0.2);
    color: #FFFFFF;
  }

  & > a.active {
    background-color: rgba(255,255,255, 0.2);
    color: #FFFFFF;
  }
`