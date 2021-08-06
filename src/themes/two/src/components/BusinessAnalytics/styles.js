import styled, { css } from 'styled-components'

export const BusinessAnalyticsContainer = styled.div`
  flex: 1;
  transition: all 0.5s;
  padding: 20px;
  overflow: hidden;
  box-sizing: borer-box;
  margin-top: 60px;

  @media print {
    display: none;
  }

  @media (min-width: 760px) {
    margin-top: 0px;
  }
`

export const BusinessAnalyticsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    font-weight: bold;
    font-size: 20px;
    color: ${props => props.theme.colors.headingColor};
  }
`

export const HeaderFilterContainer = styled.div`
  display: flex;
  align-items: center;
`

export const BusinessFilterWrapper = styled.div`
  button {
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

  button {
    svg {
      font-size: 16px;
      margin-right: 12px;
      ${props => props.theme.rtl && css`
        margin-right: 12px;
        margin-left: 0;
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