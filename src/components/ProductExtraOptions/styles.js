import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const MainContainer = styled.div`
  overflow: auto;
  transition: 0.3s;

  > button {
    margin: 20px 0;
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

export const OptionsContainer = styled.div`
  padding: 20px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.colors.headingColor};
    margin: 5px 0;
  }

  > div {
    display: flex;
    align-items: center;
    > button {
      display: none;
    }
  }

  @media (min-width: 1000px) {
    > div {
      > button {
        display: block;
        cursor: pointer;
        ${props => props.theme?.rtl ? css`
          margin-right: 10px;
        ` : css`
          margin-left: 10px;
        `}
      }
    }
  }
`

export const OptionsTable = styled.table`
  width: 100%;
  overflow: auto;
  th, td {
    color: ${props => props.theme.colors.headingColor};
    padding: 12px 0;

    > input {
      height: 32px;
      width: 50px;
      padding: 5px;
      ${props => props.theme?.rtl ? css`
        margin-left: 5px;
      ` : css`
        margin-right: 5px;
      `}
      border: none;
      outline: none;
      &:focus {
        border: 1px dashed ${props => props.theme.colors.lightGray};
      }
    }

    &:first-child {
      width: 70%;
    }
  }

  th {
    font-weight: 700;
    font-size: 12px;
  }

  td {
    font-size: 14px;
  }

  thead, tbody {
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  }
  tbody.add_option {
    border-top: 13px solid ${props => props.theme.colors.borderColor};
  }

  tbody {
    cursor: pointer;
  }
`

export const OptionNameContainer = styled.div`
  display: flex;
  align-items: center;
  > input {
    flex: 1;
    height: 32px;
    padding: 5px;
    border: none;
    outline: none;
    &:focus {
      border: 1px dashed ${props => props.theme.colors.lightGray};
    }
    ${props => props.theme?.rtl ? css`
      margin-right: 5px;
    ` : css`
      margin-left: 5px;
    `}
  }

  ${props => props.theme?.rtl ? css`
    border-left: 1px solid ${props => props.theme.colors.borderColor};
    margin-left: 20px;
  ` : css`
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    margin-right: 20px;
  `}
`

export const OptionImage = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.borderColor};

  img {
    width: 100%;
    border-radius: 8px;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  svg {
    font-size: 20px;
    color: #ADB5BD;
  }

  ${props => props.theme?.rtl ? css`
    margin-left: 15px;
  ` : css`
    margin-right: 15px;
  `}
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > svg {
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    cursor: pointer;
  }
`

export const ActionSelectorWrapper = styled.div`
  button {
    display: flex;
    background: ${props => props.theme.colors.secundary} !important;
    border: none;
    padding: 5px;
    border-radius: 8px;

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
        padding: 7px 20px;
        &:active {
          background: ${props => darken(0.1, props.theme.colors.secundary)} !important;
        }
      }
      .dropdown-item:last-child {
        color: ${props => props.theme.colors.danger};
      }
    }
  }
`
