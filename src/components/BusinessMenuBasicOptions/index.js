import React, { useState, useEffect } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { Input, TextArea } from '../../styles/Inputs'
import { Button } from '../../styles/Buttons'
import RiCheckboxBlankLine from '@meronex/icons/ri/RiCheckboxBlankLine'
import RiCheckboxFill from '@meronex/icons/ri/RiCheckboxFill'
import { Alert } from '../Confirm'
import { CategoryTreeNode } from '../CategoryTreeNode'
import { Schedule } from '../Schedule'

import {
  BusinessMenuBasicContainer,
  FieldName,
  OrderType,
  ScheduleContainer,
  ScheduleSection
} from './styles'

export const BusinessMenuBasicOptions = (props) => {
  const {
    business,
    businessMenuState,
    formState,
    handleChangeInput,
    handleCheckOrderType,
    handleUpdateBusinessMenuOption,
    handleAddBusinessMenuOption,

    selectedProductsIds,
    setSelectedProductsIds,

    handleChangeScheduleState
  } = props
  const [, t] = useLanguage()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const isEdit = Object.keys(businessMenuState?.menu).length

  const orderTypes = [
    { value: 1, key: 'delivery', content: t('DELIVERY', 'Delivery') },
    { value: 2, key: 'pickup', content: t('PICKUP', 'Pickup') },
    { value: 3, key: 'eatin', content: t('EAT_IN', 'Eat in') },
    { value: 4, key: 'curbside', content: t('CURBSIDE', 'Curbside') },
    { value: 5, key: 'driver_thru', content: t('DRIVE_THRU', 'Drive thru') }
  ]

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  useEffect(() => {
    if (!formState?.result?.error) return
    setAlertState({
      open: true,
      content: formState?.result?.result
    })
  }, [formState?.result?.error])

  return (
    <>
      <BusinessMenuBasicContainer>
        <FieldName>{t('MENU_NAME', 'Menu name')}</FieldName>
        <Input
          name='name'
          placeholder={t('NAME', 'Name')}
          value={
            formState?.changes?.name ?? businessMenuState?.menu?.name ?? ''
          }
          onChange={(e) => handleChangeInput(e)}
        />
        <FieldName isBorderBottom>{t('FRONT_MAIN_EMAIL_ORDER_TYPE', 'Order Type')}</FieldName>
        {orderTypes.map(orderType => (
          <OrderType
            key={orderType.value}
            active={(formState?.changes[orderType.key] ?? businessMenuState.menu[orderType.key])}
            onClick={() => handleCheckOrderType(orderType.key)}
          >
            {
              (formState?.changes[orderType.key] ?? businessMenuState.menu[orderType.key])
                ? (
                  <RiCheckboxFill />
                ) : (
                  <RiCheckboxBlankLine />
                )
            }
            <span>{orderType.content}</span>
          </OrderType>
        ))}
        <ScheduleContainer>
          <FieldName>{t('SCHEDULE', 'Schedule')}</FieldName>
          <ScheduleSection>
            <Schedule
              scheduleList={businessMenuState?.menu?.schedule}
              handleChangeScheduleState={handleChangeScheduleState}
            />
          </ScheduleSection>
        </ScheduleContainer>
        <FieldName>{t('COMMENTS', 'Comments')}</FieldName>
        <TextArea
          rows={4}
          name='comment'
          defaultValue={
            formState?.changes?.comment ?? businessMenuState?.menu?.comment ?? ''
          }
          placeholder={t('WRITE_HERE', 'Write here')}
          onChange={(e) => handleChangeInput(e)}
        />
        <FieldName isBorderBottom>{t('PRODUCTS', 'Products')}</FieldName>
        {business?.categories.sort((a, b) => a.rank - b.rank).map(category => (
          <CategoryTreeNode
            key={category.id}
            index={0}
            category={category}
            selectedProductsIds={selectedProductsIds}
            setSelectedProductsIds={setSelectedProductsIds}
          />
        ))}
      </BusinessMenuBasicContainer>
      <Button
        color='primary'
        borderRadius='5px'
        disabled={formState.loading || Object.keys(formState?.changes).length === 0}
        onClick={() => isEdit ? handleUpdateBusinessMenuOption() : handleAddBusinessMenuOption()}
      >
        {formState.loading ? (
          t('LOADING', 'Loading')
        ) : (
          isEdit ? (
            t('UPDATE', 'Update')
          ) : (
            t('ADD', 'Add')
          )
        )}
      </Button>
      <Alert
        title={t('WEB_APPNAME', 'Ordering')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </>
  )
}
