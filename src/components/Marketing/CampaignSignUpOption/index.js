import React, { useState } from 'react'
import { useLanguage, CampaignSignUpOption as CampaignSignUpOptionController } from 'ordering-components-admin'
import {
  Circle as UnCheckIcon,
  RecordCircleFill as CheckIcon
} from 'react-bootstrap-icons'
import { Button } from '../../../styles'

import {
  Container,
  RadioCheckWrapper,
  ButtonWrapper,
  Title,
  DateRangeWrapper,
  CalendarWrapper
} from './styles'
import { RangeCalendar, Alert } from '../../Shared'
import { CampaignCalendarTime } from '../CampaignCalendarTime'

const CampaignSignUpOptionUI = (props) => {
  const {
    type,
    title,
    handleChangeItem,
    onClose,
    isAddMode,
    handleUpdateRule,
    formState,
    handleAddRule,
    ruleFormState,
    handleChangeDate,
    handleChangeOption,
    handleChangeDateTime
  } = props

  const [, t] = useLanguage()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const defaultValue = ruleFormState.changes?.max_date && { from: ruleFormState.changes?.date, to: ruleFormState.changes?.max_date }

  const optionList = [
    { key: '>', title: t('AFTER', 'After') },
    { key: '=', title: t('ON', 'On') },
    { key: '<', title: t('BEFORE', 'Before') }
  ]

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const handleSaveRule = () => {
    if (!ruleFormState.changes?.date_condition) {
      setAlertState({
        open: true,
        content: t('VALIDATION_ERROR_REQUIRED', 'Date condition is required').replace('_attribute_', t('DATE_CONDITION', 'Date condition'))
      })
      return
    }
    if (!ruleFormState.changes?.date) {
      setAlertState({
        open: true,
        content: t('VALIDATION_ERROR_REQUIRED', 'Date is required').replace('_attribute_', t('DATE', 'Date'))
      })
      return
    }

    if (isAddMode) {
      const updatedConditions = formState?.changes?.conditions.map(condition => {
        if (condition.type === type) {
          return { ...condition, ...ruleFormState.changes }
        }
        return condition
      })
      handleChangeItem('conditions', updatedConditions)
    } else if (ruleFormState.changes?.id) {
      handleUpdateRule()
    } else {
      handleAddRule()
    }
    onClose && onClose()
  }

  return (
    <>
      <Container>
        <Title>{title}</Title>
        {optionList.map(option => (
          <React.Fragment key={option.key}>
            <RadioCheckWrapper>
              <div onClick={() => handleChangeOption(option.key)}>
                {ruleFormState.changes?.date_condition === option.key ? <CheckIcon className='fill' /> : <UnCheckIcon />}
                <span>{option.title}</span>
              </div>
            </RadioCheckWrapper>
            {ruleFormState.changes?.date_condition === option.key && (
              <CalendarWrapper>
                <CampaignCalendarTime
                  showTime
                  dateTime={ruleFormState.changes?.date}
                  handleChangeDateTime={handleChangeDateTime}
                />
              </CalendarWrapper>
            )}
          </React.Fragment>
        ))}
        <RadioCheckWrapper>
          <div onClick={() => handleChangeOption('<>')}>
            {ruleFormState.changes?.date_condition === '<>' ? <CheckIcon className='fill' /> : <UnCheckIcon />}
            <span>{t('DATE_RANGE', 'Date range')}</span>
          </div>
        </RadioCheckWrapper>
        {ruleFormState.changes?.date_condition === '<>' && (
          <DateRangeWrapper>
            <RangeCalendar
              handleChangeDate={handleChangeDate}
              defaultValue={defaultValue}
              isLeft
            />
          </DateRangeWrapper>
        )}
      </Container>
      <ButtonWrapper>
        <Button
          color='primary'
          borderRadius='8px'
          onClick={handleSaveRule}
        >
          {t('DONE', 'Done')}
        </Button>
      </ButtonWrapper>
      <Alert
        title={t('CAMPAIGN', 'Campaign')}
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

export const CampaignSignUpOption = (props) => {
  const campaignSignUpOptionProps = {
    ...props,
    UIComponent: CampaignSignUpOptionUI
  }
  return <CampaignSignUpOptionController {...campaignSignUpOptionProps} />
}
