import React, { useState, useEffect } from 'react'
import { useLanguage, useToast, ToastType } from 'ordering-components-admin'
import { useForm } from 'react-hook-form'
import { Button } from '../../../styles'
import { Modal, DragScroll, Alert } from '../../Shared'
import { useTheme } from 'styled-components'

import {
  SettingContainer,
  SettingHeader,
  SettingControlPanel,
  TabsContainer,
  Tab,
  DeliveryStatusWrapper,
  StatusItems,
  ItemHeader,
  ItemStatus,
  ItemContent,
  IconWrapper,
  Actions,
  TimerInputWrapper,
  OverLine
} from './styles'

export const OrderDashboardSLASetting = (props) => {
  const { setSlaSettingTime } = props
  const [, t] = useLanguage()
  const [settingOpen, setSettingOpen] = useState(false)
  const [currentTabItem, setCurrentTabItem] = useState(1)
  const [selectedTabStatus, setSelectedTabStatus] = useState(null)
  const theme = useTheme()
  const formMethods = useForm()
  const [, { showToast }] = useToast()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [readySettingTime, setReadySettingTime] = useState([])

  const defaultOrderTypes = [
    { key: 1, name: t('DELIVERY', 'Delivery') },
    { key: 2, name: t('PICKUP', 'Pickup') },
    { key: 3, name: t('EAT_IN', 'Eat in') },
    { key: 4, name: t('CURBSIDE', 'Curbside') },
    { key: 5, name: t('DRIVE_THRU', 'Drive thru') }
  ]

  const deliveryStatus = [
    {
      key: t('OK', 'Ok'),
      des: t('DELIVERY_OK_STATUS_DESC', 'Get delivery time from the businesses.'),
      timmer: false,
      icon: theme.images.icons?.clock1,
      backColor: '#00D27A'
    },
    {
      key: t('AT_RISK', 'At risk'),
      des: t('DELIVERY_ATRISK_STATUS_DESC', 'Is the time between delivery time of busines and the delayed time.'),
      timmer: false,
      icon: theme.images.icons?.clockRisk,
      backColor: '#FFC700'
    },
    {
      key: t('DELAYED', 'Delayed'),
      des: t('DELIVERY_DELAYED_STATUS_DESC', 'If this time is exceeded, the order will be delayed.'),
      timmer: false,
      icon: theme.images.icons?.clockDelayed,
      backColor: '#E63757'
    }
  ]

  const handleCloseSettings = () => {
    setSettingOpen(false)
  }

  const checkReadySatus = (data) => {
    let _readySettingTime = [...readySettingTime]
    if (data?.status) {
      _readySettingTime.push(data)
    } else {
      _readySettingTime = _readySettingTime.filter(ele => ele.id !== data.id)
    }
    setReadySettingTime(_readySettingTime)
  }

  useEffect(() => {
    setSelectedTabStatus(deliveryStatus)
  }, [])

  useEffect(() => {
    if (Object.keys(formMethods.errors).length > 0) {
      setAlertState({
        open: true,
        content: Object.values(formMethods.errors).map(error => error.message)
      })
    }
  }, [formMethods.errors])

  const onSubmit = (data) => {
    if (data && Object.keys(data).length > 0) {
      const _hour = parseInt(data.hour)
      const _min = parseInt(data.minute)
      const _settingTimeSecond = _hour * 3600 + _min * 60
      setSlaSettingTime(_settingTimeSecond)
      showToast(ToastType.Success, t('SLA_SETTING_UPDATED', 'SLAs setting updated'))
      setSettingOpen(false)
    }
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  return (
    <SettingContainer>
      <Button
        color='secundary'
        onClick={() => setSettingOpen(true)}
      >
        {t('SLA_SETTING', 'SLA’s settings')}
      </Button>
      <Modal
        open={settingOpen}
        onClose={() => handleCloseSettings()}
        width='fit-content'
      >
        <SettingControlPanel
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <SettingHeader>{t('SLA_SETTINGS', 'SLA’s settings')}</SettingHeader>
          <TabsContainer>
            <DragScroll>
              {defaultOrderTypes.map(item => (
                <Tab
                  key={item.key}
                  active={item.key === currentTabItem}
                  onClick={() => setCurrentTabItem(item.key)}
                >
                  {item.name}
                </Tab>
              ))}
            </DragScroll>
          </TabsContainer>
          <DeliveryStatusWrapper>
            {selectedTabStatus && selectedTabStatus.length > 0 && selectedTabStatus.map((item, i) => (
              <StatusBlock key={i} item={item} last={i + 1 === selectedTabStatus.length} formMethods={formMethods} checkReadySatus={checkReadySatus} />
            ))}
          </DeliveryStatusWrapper>
          <Actions>
            <Button
              color='primary'
              type='submit'
              disabled={readySettingTime.length === 0}
            >
              {t('ACCEPT', 'Accept')}
            </Button>
          </Actions>
        </SettingControlPanel>
      </Modal>
      <Alert
        title={t('SLA_SETTING', 'SLA’s settings')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </SettingContainer>
  )
}

export const StatusBlock = (props) => {
  const { item, last, formMethods, checkReadySatus } = props
  const [showTime, setShowTime] = useState(false)

  const handleShowTimer = () => {
    checkReadySatus({ id: item?.key, status: !showTime })
    setShowTime(!showTime)
  }

  useEffect(() => {
    if (item?.timmer) {
      setShowTime(true)
    }
  }, [item?.timmer])

  return (
    <StatusItems>
      <ItemHeader onClick={() => handleShowTimer()}>
        <IconWrapper>
          <img src={item?.icon} alt='' />
        </IconWrapper>
        <ItemStatus backColor={item?.backColor} />
        <span>{item?.key}</span>
      </ItemHeader>
      <ItemContent>
        <p>{item?.des}</p>
      </ItemContent>
      {showTime && (
        <Timer formMethods={formMethods} />
      )}
      {last && (
        <OverLine />
      )}
    </StatusItems>
  )
}

export const Timer = (props) => {
  const { formMethods } = props
  const [, t] = useLanguage()

  return (
    <TimerInputWrapper>
      <input
        name='hour'
        type='number'
        placeholder='HH'
        ref={formMethods.register({
          required: t('VALIDATION_ERROR_HOUR_REQUIRED', 'The field hour is required').replace('_attribute_', t('HOUR', 'Hour'))
        })}
      />
      :
      <input
        name='minute'
        type='number'
        placeholder='MM'
        ref={formMethods.register({
          required: t('VALIDATION_ERROR_MINUTE_REQUIRED', 'The field minute is required').replace('_attribute_', t('MINUTE', 'Minute'))
        })}
      />
    </TimerInputWrapper>
  )
}
