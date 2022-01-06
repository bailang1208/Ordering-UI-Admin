import React, { useState, useRef, useEffect } from 'react'
import { useLanguage, useApi, InvoiceDriverManager as InvoiceDriverManagerController } from 'ordering-components-admin'
import { DragScroll } from '../DragScroll'
import { SpinnerLoader } from '../SpinnerLoader'
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
import { InvoiceDriverPdf } from '../InvoiceDriverPdf'

const InvoiceDriverManagerUI = (props) => {
  const {
    actionSidebar,
    exportInvoiceList,
    invocing,
    getOrders
  } = props

  const [, t] = useLanguage()
  const [ordering] = useApi()
  const [selectedDetailType, setSelectedDetailType] = useState('general')
  const inputRef = useRef(null)
  const submitBtnRef = useRef(null)
  const invoicePdfRef = useRef(null)

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
        <h2>{t('DRIVER_INVOICE', 'Driver invoice')}</h2>
        <HeaderActionBtnWrapper>
          <IconButton
            onClick={pdfDownload}
            disabled={!invocing?.driver || invocing?.driver === ''}
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
        </DragScroll>
      </DetailsList>
      {
        selectedDetailType === 'general' && <InvoiceGeneral {...props} />
      }
      {
        selectedDetailType === 'payment_methods' && <InvoicePayMethods {...props} />
      }
      <Form target='_blank' action={`${ordering.root}/pdf/html`} method='POST'>
        <input ref={inputRef} type='hidden' name='html' />
        <button ref={submitBtnRef} type='submit' />
      </Form>
      <InvoicePdfWrapper ref={invoicePdfRef}>
        <InvoiceDriverPdf {...props} />
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

export const InvoiceDriverManager = (props) => {
  const invoiceDriverManagerProps = {
    ...props,
    propsToFetch: ['id', 'name'],
    UIComponent: InvoiceDriverManagerUI
  }
  return <InvoiceDriverManagerController {...invoiceDriverManagerProps} />
}
