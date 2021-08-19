import React, { useEffect, useState } from 'react'
import { useLanguage } from 'ordering-components-admin'
import Skeleton from 'react-loading-skeleton'
import { Checkbox } from '../../styles/Checkbox'
import { Button } from '../../styles/Buttons'
import { toast } from 'react-toastify'
import {
  InvoicePayMethodsContainer,
  CheckboxWrapper,
  ActionBtnWrapper
} from './styles'

export const InvoicePayMethods = (props) => {
  const {
    payMethodsList,
    handleChangePayMethods
  } = props
  const [, t] = useLanguage()
  const [checkBoxList, setCheckBoxList] = useState([])

  const saveFormData = () => {
    handleChangePayMethods(checkBoxList)
    const toastConfigure = {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    }
    const content = t('INVOICE_DATA_SAVED', 'Invoice data saved')
    toast.dark(content, toastConfigure)
  }

  const handleChangeCheckBox = (id, checked) => {
    const _checkBoxList = checkBoxList.map(payment => {
      if (id === payment.id) {
        return {
          ...payment,
          enabled: checked
        }
      }
      return payment
    })
    setCheckBoxList(_checkBoxList)
  }

  useEffect(() => {
    if (payMethodsList?.data.length > 0) {
      setCheckBoxList(payMethodsList?.data)
    }
  }, [payMethodsList?.data])

  return (
    <InvoicePayMethodsContainer>
      {
        payMethodsList?.loading ? (
          <>
            {
              [...Array(5).keys()].map(i => (
                <Skeleton key={i} height={35} style={{ marginBottom: '15px' }} />
              ))
            }
          </>
        ) : (
          <>
            {
              checkBoxList.map((item, i) => (
                <CheckboxWrapper key={i}>
                  <Checkbox
                    defaultChecked={item.enabled}
                    id={item.id}
                    onClick={(e) => handleChangeCheckBox(item.id, e.target.checked)}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </CheckboxWrapper>
              ))
            }
          </>
        )
      }
      <ActionBtnWrapper>
        <Button
          borderRadius='7.6px'
          color='primary'
          disabled={payMethodsList?.loading}
          onClick={saveFormData}
        >
          {t('SAVE', 'Save')}
        </Button>
      </ActionBtnWrapper>
    </InvoicePayMethodsContainer>
  )
}
