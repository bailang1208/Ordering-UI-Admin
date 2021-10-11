import React, { useState } from 'react'
import { useInfoShare } from '../../contexts/InfoShareContext'
import { IconButton } from '../../styles/Buttons'
import {
  List as MenuIcon,
  Rulers,
  Map,
  MapFill,
  ClockHistory,
  FileRuled,
  FileEarmarkRuled
} from 'react-bootstrap-icons'
import { useLanguage } from 'ordering-components-admin'
import { SettingItemUI } from '../SettingItemUI'
import { SideBar } from '../SideBar'
import { ReportsBusinessDistance } from '../ReportsBusinessDistance'
import {
  ReportsContainer,
  HeaderTitleContainer,
  ReportsList
} from './styles'
import { ReportsOrderDistance } from '../ReportsOrderDistance'
import { ReportsBusinessSpend } from '../ReportsBusinessSpend'
import { ReportsDriverSpend } from '../ReportsDriverSpend'
import { ReportsDriverOrder } from '../ReportsDriverOrder'
import { ReportsDriverOrderTime } from '../ReportsDriverOrderTime'

export const Reports = (props) => {
  const [, t] = useLanguage()
  const [{ isCollapse }, { handleMenuCollapse }] = useInfoShare()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState(0)

  const advancedReportsList = [
    { id: 1, name: t('DISTANCE', 'Distance'), description: t('DISTANCE_DESCRIPTION', 'Distance'), icon: <Rulers /> },
    { id: 2, name: t('DISTANCE_STORE_CUSTOMER', 'Distance in KM from the store to customer'), description: t('DISTANCE_STORE_CUSTOMER_DESCRIPTION', 'Distance in KM from the store to customer'), icon: <Map /> },
    { id: 3, name: t('DISTANCE_STORE_CUSTOMER_RANGE_KM', 'Distance in KM from the store to customer (Range KM)'), description: t('DISTANCE_STORE_CUSTOMER_RANGE_KM_DESCRIPTION', 'Distance in KM from the store to customer (Range KM)'), icon: <MapFill /> },
    { id: 4, name: t('SERVICE_TIMES', 'Service Times'), description: t('SERVICE_TIMES_DESCRIPTION', 'Service Times'), icon: <ClockHistory /> },
    { id: 5, name: t('DETAIL_COMPLETED_ORDERS', 'Detail of the completed orders of each delivery agency'), description: t('DETAIL_COMPLETED_ORDERS_DESCRIPTION', 'Detail of the completed orders of each delivery agency'), icon: <FileRuled /> },
    { id: 6, name: t('NUMBER_ORDERS_SPECIFIC_RANGE', 'Number of orders within a specific range'), description: t('NUMBER_ORDERS_SPECIFIC_RANGE_DESCRIPTION', 'Number of orders within a specific range'), icon: <FileEarmarkRuled /> }
  ]

  const handleCloseSidebar = () => {
    setIsOpen(false)
    setSelectedReport(0)
  }

  const handleOpenSlider = (index) => {
    setSelectedReport(index)
    setIsOpen(true)
  }

  return (
    <ReportsContainer>
      <HeaderTitleContainer>
        {isCollapse && (
          <IconButton
            color='black'
            onClick={() => handleMenuCollapse(false)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <h1>{t('ADVANCED_REPORTS', 'Advanced Reports')}</h1>
      </HeaderTitleContainer>
      <ReportsList className='row'>
        {advancedReportsList && advancedReportsList.map((report, i) => (
          <div
            key={i}
            className='col-md-6 col-lg-4'
            onClick={() => handleOpenSlider(report.id)}
          >
            <SettingItemUI
              title={report.name}
              // description={t('DISTANCE_DESC')}
              description={report.description}
              icon={report.icon}
              active={selectedReport === report.id}
            />
          </div>
        ))}
      </ReportsList>
      {isOpen && (
        <SideBar
          sidebarId='brand-details'
          defaultSideBarWidth={700}
          open={isOpen}
          onClose={() => handleCloseSidebar()}
        >
          {selectedReport === 1 && <ReportsBusinessDistance />}
          {selectedReport === 2 && <ReportsOrderDistance />}
          {selectedReport === 3 && <ReportsBusinessSpend />}
          {selectedReport === 4 && <ReportsDriverOrderTime />}
          {selectedReport === 5 && <ReportsDriverSpend />}
          {selectedReport === 6 && <ReportsDriverOrder />}
        </SideBar>
      )}
    </ReportsContainer>
  )
}
