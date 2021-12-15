import React from 'react'
import styled, { css } from 'styled-components'

export const UsersConatiner = styled.div`
  margin-top: 20px;
`

export const UserTableWrapper = styled.div`
`

export const UsersTable = styled.table`
  width: calc(100% - 10px);
  min-width: 900px;
  color: ${props => props.theme.colors?.headingColor};

  td, th {
    padding: 10px 0;
    font-size: 14px;
    &:first-child {
      width: 30%;
    }
    &:nth-child(2) {
      width: 20%;
    }

    &:nth-child(4),
    
    &:nth-child(5) {
      width: 10%;
    }
  }

  thead {
    tr {
      border-bottom: solid 1px ${props => props.theme.colors.disabled};
    }
  }

  tbody {
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.lightPrimary};
    }
    &.active {
      background-color: ${props => props.theme.colors.lightPrimary};
      td {
        border-top: 1px solid ${props => props.theme.colors.primary};
        border-bottom: 1px solid ${props => props.theme.colors.primary};
      }
    }
  }
`

export const WrapperImage = styled.div`
  max-width: 45px;
  max-height: 45px;
  height: 45px;
  width: 45px;
  ${({ isSkeleton }) => !isSkeleton && css`
    border: 1px solid #E3E3E3;
  `}
  border-radius: 10px;

  svg {
    width: 100%;
    height: 100%;
    padding: 7px;
    box-sizing: border-box;
    border-radius: 50%;
  }

  ${props => props.theme?.rtl ? css`
    margin-left: 10px;
  ` : css`
    margin-right: 10px;
  `}
`

const ImageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  border-radius: 8px;
`
export const Image = (props) => {
  return (
    <ImageStyled
      {...props}
      style={{ backgroundImage: `url(${props.bgimage})` }}
    >
      {props.children}
    </ImageStyled>
  )
}

export const UserMainInfo = styled.div`
  display: flex;
  align-items: center;

  ${props => props.theme?.rtl ? css`
    border-left: 1px solid ${props => props.theme.colors.borderColor};
    margin-left: 20px;
    padding-left: 10px;
  ` : css`
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    margin-right: 20px;
    padding-right: 10px;
  `}

  > div:last-child {
    flex: 1;
  }
`

export const CheckBoxWrapper = styled.div`
  cursor: pointer;
  ${props => props.theme?.rtl ? css`
    margin-left: 10px;
  ` : css`
    margin-right: 10px;
  `}
  svg {
    font-size: 24px;
    color: #B1BCCC;
  }

  ${({ isChecked }) => isChecked && css`
    svg {
      color: ${props => props.theme.colors?.primary};
    }
`}
`

export const InfoBlock = styled.div`
  p {
    margin: 5px 0 0 0;
    font-size: 12px;
    color: ${props => props.theme.colors.lightGray};
  }
  p.bold {
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.colors.headingColor};
  }
`
export const UserTypeWrapper = styled.div`
  ${props => props.theme?.rtl ? css`
    border-left: 1px solid ${props => props.theme.colors.borderColor};
    margin-left: 20px;
  ` : css`
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    margin-right: 20px;
  `}
  > div {
    display: flex;

    .select {
      border: none;
      padding: 0px;

      > div {
        padding: 0px;
      }
    }

    .list {
      .options {
        border: 1px solid #E9ECEF;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
      }
    }
  }
  > p {
    margin: 5px 0 0 0;
    font-size: 12px;
    color: ${props => props.theme.colors.lightGray};
  }
`

export const UserEnableWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  span {
    font-size: 14px;

    ${props => props.theme?.rtl ? css`
      padding-left: 10px;
    ` : css`
      padding-right: 10px;
    `}
  }
`
export const WrapperPagination = styled.div`
  display: flex;
  align-items: center;
`

export const WrapperUserActionSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background: transparent !important;
    border: none;
    padding: 0px;
    &:active,
    &:focus {
      border-color: unset !important;
      box-shadow: none !important;
    }
    svg {
      color: ${props => props.theme.colors.headingColor};
    }
    &:after {
      display: none;
    }
  }
  .show {
    button {
      background: #F8F9FA !important;
      border-color: unset !important;
      box-shadow: none !important;
    }
    >div {
      border: 1px solid #E9ECEF;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
    }
  }
  > div {
    border-radius: 8px;
    ${props => props.theme?.rtl ? css`
      margin-left: 5px;
    ` : css`
      margin-right: 5px;
    `}
    > div {
      a:last-child {
        color: #E63757;
      }
    }
    .dropdown-item {
      font-size: 14px;
    }
  }
`

export const AddNewUserButton = styled.div`
  cursor: pointer;
  color: ${props => props.theme.colors.lightGray};
  width: fit-content;
  font-size: 14px;
`

export const UsersBottomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`
