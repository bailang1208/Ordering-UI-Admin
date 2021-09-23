import styled, { css } from 'styled-components'

export const BusinessAnalyticsContainer = styled.div`
  flex: 1;
  transition: all 0.5s;
  padding: 20px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: auto;
`

export const BusinessAnalyticsHeader = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const HeaderTitleContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  h1 {
    font-weight: 700;
    font-size: 20px;
    color: ${props => props.theme.colors.headingColor};
    margin: 0px;
  }

  > button {
    ${props => props.theme?.rtl ? css`
      margin-left: 8px;
      margin-right: -8px;
    ` : css`
      margin-right: 8px;
      margin-left: -8px;
    `}

    svg {
      width: 25px;
      height: 25px;
    }
  }
`

export const HeaderFilterContainer = styled.div`
  display: flex;
  align-items: center;
`

export const BusinessFilterWrapper = styled.div`
  > button {
    background: #F8F9FA;
    border-radius: 7.6px;
    padding: 7px 12px;
    font-size: 14px;
    color: #748194;
    border: none;
  }
`

export const BusinessCalendarWrapper = styled(BusinessFilterWrapper)`
  position: relative;
  margin-left: 25px;
  ${props => props.theme.rtl && css`
    margin-right: 25px;
    margin-left: 0;
  `}

  > button {
    svg {
      font-size: 16px;
      margin-right: 12px;
      ${props => props.theme.rtl && css`
        margin-left: 12px;
        margin-right: 0;
      `}
    }
  }
`

export const AnalyticsContentWrapper = styled.div`
  > div {
    margin-top: 40px;
  }
`

export const MapWrraper = styled.div`
  margin-top: 20px;
`
