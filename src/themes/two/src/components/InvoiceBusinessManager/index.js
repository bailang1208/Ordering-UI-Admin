import React, { useEffect, useRef, useState } from 'react'
import { useLanguage, useApi, InvoiceBusinessManager as InvoiceBusinessManagerController } from 'ordering-components-admin'
import { DragScroll } from '../DragScroll'
import {
  InvoiceDriversContainer,
  DetailsHeader,
  HeaderActionBtnWrapper,
  DetailsList,
  Tab,
  Form,
  InvoicePdfWrapper,
  LoadingWrapper
} from './styles'
import { IconButton } from '../../styles/Buttons'
import {
  Download,
  XLg as CloseIcon
} from 'react-bootstrap-icons'
import { InvoiceGeneral } from '../InvoiceGeneral'
import { InvoicePayMethods } from '../InvoicePayMethods'
import { InvoiceOrderType } from '../InvoiceOrdertype'
import { InvoiceBusinessPdf } from '../InvoiceBusinessPdf'
import { SpinnerLoader } from '../SpinnerLoader'

const InvoiceBusinessManagerUI = (props) => {
  const {
    actionSidebar,
    getOrders,
    invocing,
    exportInvoiceList
  } = props

  const [, t] = useLanguage()
  const [ordering] = useApi()
  const inputRef = useRef(null)
  const submitBtnRef = useRef(null)
  const invoicePdfRef = useRef(null)

  const [selectedDetailType, setSelectedDetailType] = useState('general')

  const changeSelectedAnalyticsStatus = (detailType) => {
    window.scrollTo(0, 0)
    setSelectedDetailType(detailType)
  }

  const pdfDownload = () => {
    getOrders()
  }

  useEffect(() => {
    if (!exportInvoiceList?.loading && exportInvoiceList?.invoice) {
      inputRef.current.value = invoicePdfRef?.current.innerHTML
      submitBtnRef.current.click()
    }
  }, [exportInvoiceList?.loading])

  return (
    <InvoiceDriversContainer>
      <DetailsHeader>
        <h2>{t('BUSINESS_INVOICE', 'Business invoice')}</h2>
        <HeaderActionBtnWrapper>
          <IconButton
            onClick={pdfDownload}
            disabled={!invocing?.business || invocing?.business === ''}
          >
            <Download />
          </IconButton>
          <IconButton
            color='black'
            onClick={() => actionSidebar(false)}
          >
            <CloseIcon />
          </IconButton>
        </HeaderActionBtnWrapper>
      </DetailsHeader>
      <DetailsList>
        <DragScroll>
          <Tab
            active={selectedDetailType === 'general'}
            onClick={() => changeSelectedAnalyticsStatus('general')}
          >
            {t('GENERAL', 'General')}
          </Tab>

          <Tab
            active={selectedDetailType === 'payment_methods'}
            onClick={() => changeSelectedAnalyticsStatus('payment_methods')}
          >
            {t('PAYMENT_METHODS', 'Payment methods')}
          </Tab>

          <Tab
            active={selectedDetailType === 'order_type'}
            onClick={() => changeSelectedAnalyticsStatus('order_type')}
          >
            {t('ORDER_TYPE', 'Order type')}
          </Tab>
        </DragScroll>
      </DetailsList>
      {
        selectedDetailType === 'general' && <InvoiceGeneral {...props} />
      }
      {
        selectedDetailType === 'payment_methods' && <InvoicePayMethods {...props} />
      }
      {
        selectedDetailType === 'order_type' && (
          <InvoiceOrderType
            {...props}
          />
        )
      }
      <Form target='_blank' action={`${ordering.root}/pdf/html`} method='POST'>
        <input ref={inputRef} type='hidden' name='html' />
        <button ref={submitBtnRef} type='submit' />
      </Form>
      <InvoicePdfWrapper ref={invoicePdfRef}>
        <InvoiceBusinessPdf {...props} />
      </InvoicePdfWrapper>
      {
        exportInvoiceList?.loading && (
          <LoadingWrapper>
            <SpinnerLoader />
          </LoadingWrapper>
        )
      }
    </InvoiceDriversContainer>
  )
}

export const InvoiceBusinessManager = (props) => {
  const invoiceBusinessManagerProps = {
    ...props,
    propsToFetch: ['name'],
    UIComponent: InvoiceBusinessManagerUI
  }
  return <InvoiceBusinessManagerController {...invoiceBusinessManagerProps} />
}
