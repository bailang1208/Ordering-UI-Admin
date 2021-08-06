import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h1 {
      font-size: 20px;
      margin: 0px;
      font-weight: 700;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  > *:not(:last-child) {
    ${props => props.theme?.rtl ? css`
      margin-left: 10px;
    ` : css`
      margin-right: 10px;
    `}
  }

  input {
    background: ${props => props.theme.colors.secundary};
    border: none;
  }

  button {
    height: 41px;
  }

  @media (min-width: 768px) {
    margin-top: 0px;
  }
`
