import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 20px;
  overflow: auto;
  transition: 0.3s;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  > button:last-child {
    margin-top: 20px;
    position: sticky;
    top: 100%;
    width: fit-content;
    height: 42px;
    margin-bottom: 20px;
  }

  > input {
    background: ${props => props.theme.colors.secundary};
  }

  @media (min-width: 1000px) {
    width: 0;
    ${props => props.theme?.rtl ? css`
      border-right: 1px solid #E9ECEF;
    ` : css`
      border-left: 1px solid #E9ECEF;
    `}
  }
`

export const FieldName = styled.p`
  color: ${props => props.theme.colors.headingColor};
  margin: 30px 0 10px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 20px;
    color: ${props => props.theme.colors.headingColor};
    font-weight: 700;
    flex: 1;
    margin: 0;
  }
`

export const CloseButton = styled.div`
  display: none;
  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
  }
`

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputWrapper = styled.div`
  width: 48%;
`

export const StripeConnectButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: #D4F2FF;
  border-radius: 7.6px;
  color: #27BCFD;
  width: fit-content;
  padding: 7px 15px;
  display: flex;
  align-items: center;

  &:active {
    background: #258cb9;
    color: #FFF;
    span {
      &:first-child {
        background: ${props => props.theme.colors?.backgroundPage || '#FFF'};
        svg {
          color: #27BCFD;
        }
      }
    }
  }

  span {
    &:first-child {
      background: #27BCFD;
      padding: 2px;
      border-radius: 5px;
      svg {
        font-size: 20px;
        color: #FFF;
      }
    }
    &:last-child {
      ${props => props.theme?.rtl ? css`
        margin-right: 15px;
      ` : css`
        margin-left: 15px;
      `}
    }
  }
`
export const ActionSelectorWrapper = styled.div`
  margin: 0 10px;
  button {
    background: transparent !important;
    border: none;
    padding: 0px 5px;
    &:active,
    &:focus {
      border-color: unset !important;
      box-shadow: none !important;
    }
    svg {
      color: ${props => props.theme.colors.headingColor};
      font-size: 20px;
    }

    &:after {
      display: none;
    }

    &:hover {
      background: ${props => darken(0.04, props.theme.colors.secundary)} !important;
    }
    &:active {
      background: ${props => darken(0.1, props.theme.colors.secundary)} !important;
    }
  }

  .show {
    button {
      background: ${props => darken(0.04, props.theme.colors.secundary)} !important;
    }
    >div {
      border: 1px solid ${props => props.theme.colors.borderColor};
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
    }
  }

  > div {
    > div {
      border-radius: 8px;
      .dropdown-item {
        font-size: 12px;
        color: ${props => props.theme.colors.headingColor};
        &:active {
          background: ${props => darken(0.1, props.theme.colors.secundary)} !important;
        }
      }
      .dropdown-item:last-child {
        color: #E63757;
      }
    }
  }
`
