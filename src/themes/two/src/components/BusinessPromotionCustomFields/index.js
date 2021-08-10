import React, { useState, useEffect } from 'react'
import { useLanguage, BusinessPromotionMetaFields as BusinessPromotionMetaFieldsController } from 'ordering-components-admin'
import { Alert } from '../Confirm'
import Skeleton from 'react-loading-skeleton'
import BsTrash from '@meronex/icons/bs/BsTrash'
import BsPlusSquare from '@meronex/icons/bs/BsPlusSquare'
import { Select } from '../../styles/Select'
import { Select as FirstSelect } from '../../styles/Select/FirstSelect'
import { useForm } from 'react-hook-form'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import { SpinnerLoader } from '../SpinnerLoader'
import { IconButton } from '../../styles/Buttons'
import {
  WrapMetaFields,
  MetaContainer,
  RoundBorder,
  NoMetaField,
  MetaAddForm,
  MetaAddContainer,
  SkeletonItem,
  WrapperSpinnerLoader
} from './styles'

const BusinessPromotionCustomFieldsUI = (props) => {
  const {
    businessId,
    offerId,
    metaFieldsList,
    actionState,
    handleDeleteMetaField,
    handeAddMetaField
  } = props
  const [, t] = useLanguage()
  const { handleSubmit, register, errors } = useForm()

  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [selectedMetaKey, setSelectedMetaKey] = useState('text')
  const [selectedBoolean, setSelectedBoolean] = useState('1')
  const [metaKey, setMetaKey] = useState('')
  const [metaValue, setMetaValue] = useState('')
  const [json, setJson] = useState({})
  const metaTypeOptions = [
    {
      value: 'integer',
      content: t('INTEGER', 'integer')
    },
    {
      value: 'decimal',
      content: t('DECIMAL', 'decimal')
    },
    {
      value: 'boolean',
      content: t('BOOLEAN', 'boolean')
    },
    {
      value: 'text',
      content: t('TEXT', 'text')
    },
    {
      value: 'json',
      content: t('JSON', 'json')
    }
  ]
  const booleanOptions = [
    {
      value: '1',
      content: t('TRUE', 'true')
    },
    {
      value: '0',
      content: t('FALSE', 'false')
    }
  ]
  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const handleChangeJson = (v) => {
    setJson(v)
  }

  const onSubmit = () => {
    let value
    if (selectedMetaKey === 'json') {
      value = JSON.stringify(json)
    } else if (selectedMetaKey === 'boolean') {
      value = selectedBoolean
    } else {
      value = metaValue
    }
    handeAddMetaField({
      key: metaKey,
      business_id: businessId,
      value: value,
      value_type: selectedMetaKey,
      offer_id: offerId
    })
  }

  useEffect(() => {
    if (document.getElementById('meta_key')) {
      document.getElementById('meta_key').value = ''
    }
    if (document.getElementById('meta_value')) {
      document.getElementById('meta_value').value = ''
    }
  }, [selectedMetaKey])

  useEffect(() => {
    if (!actionState.loading && actionState.result?.error) {
      setAlertState({
        open: true,
        content: actionState.result?.result || [t('ERROR')]
      })
    }
    if (!actionState.loading && !actionState.result?.error) {
      if (document.getElementById('meta_key')) {
        document.getElementById('meta_key').value = ''
      }
      if (document.getElementById('meta_value')) {
        document.getElementById('meta_value').value = ''
      }
    }
  }, [actionState])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertState({
        open: true,
        content: Object.values(errors).map((error) => error.message)
      })
    }
  }, [errors])

  return (
    <>
      {metaFieldsList.loading ? (
        <WrapMetaFields>
          {[...Array(10).keys()].map(i => (
            <SkeletonItem key={i}>
              <Skeleton width={50} height={30} />
              <Skeleton width={50} height={30} />
              <Skeleton width={150} height={30} />
              <Skeleton width={25} height={30} />
            </SkeletonItem>
          ))}
        </WrapMetaFields>
      ) : (
        <WrapMetaFields>
          {metaFieldsList.metaFields.length > 0 ? (
            <>
              {metaFieldsList.metaFields.map(metaField => (
                <MetaContainer key={metaField.id}>
                  <div className='meta_type'>
                    {metaField.value_type}
                  </div>
                  <div className='meta_key'>
                    <RoundBorder>{metaField.key}</RoundBorder>
                  </div>
                  <div className='meta_value'>
                    <RoundBorder>
                      {metaField.value_type === 'boolean' ? (
                        <>
                          {metaField.value === '0' ? t('FALSE', 'fase') : t('TRUE', 'true')}
                        </>
                      ) : (
                        <>
                          {metaField.value}
                        </>
                      )}
                    </RoundBorder>
                    <IconButton onClick={() => handleDeleteMetaField(metaField.id)}>
                      <BsTrash />
                    </IconButton>
                  </div>
                </MetaContainer>
              ))}
            </>
          ) : (
            <NoMetaField>{t('NO_METAFIELD', 'No MetaField')}</NoMetaField>
          )}
          <MetaAddForm
            onSubmit={handleSubmit(onSubmit)}
          >
            <MetaAddContainer>
              <div className='meta_type'>
                <Select
                  defaultValue={selectedMetaKey || 'text'}
                  options={metaTypeOptions}
                  onChange={(key) => setSelectedMetaKey(key)}
                />
              </div>
              <div className='meta_key'>
                <input
                  type='text'
                  name='key'
                  id='meta_key'
                  onChange={(e) => setMetaKey(e.target.value)}
                  placeholder={t('KEY', 'key')}
                  ref={register({
                    required: t(
                      'VALIDATION_ERROR_REQUIRED',
                      'Key is required'
                    ).replace('_attribute_', t('KEY', 'Key'))
                  })}
                />
              </div>
              <div className='meta_value'>
                {selectedMetaKey === 'text' && (
                  <input
                    type='text'
                    name='value'
                    id='meta_value'
                    onChange={(e) => setMetaValue(e.target.value)}
                    placeholder={t('VALUE', 'Vlue')}
                    ref={register({
                      required: t(
                        'VALIDATION_ERROR_REQUIRED',
                        'Value is required'
                      ).replace('_attribute_', t('VALUE', 'Vlue'))
                    })}
                  />
                )}
                {selectedMetaKey === 'integer' && (
                  <input
                    type='text'
                    name='value'
                    onChange={(e) => setMetaValue(e.target.value)}
                    placeholder={t('VALUE', 'Vlue')}
                    ref={register({
                      required: t(
                        'VALIDATION_ERROR_REQUIRED',
                        'Value is required'
                      ).replace('_attribute_', t('VALUE', 'Vlue')),
                      pattern: {
                        value: /^\d+$/,
                        message: t(
                          'VALIDATION_ERROR_INTEGER',
                          'Invalid integer'
                        ).replace('_attribute_', t('VALUE', 'Vlue'))
                      }
                    })}
                  />
                )}
                {selectedMetaKey === 'decimal' && (
                  <input
                    type='text'
                    name='value'
                    onChange={(e) => setMetaValue(e.target.value)}
                    placeholder={t('VALUE', 'Vlue')}
                    ref={register({
                      required: t(
                        'VALIDATION_ERROR_REQUIRED',
                        'Value is required'
                      ).replace('_attribute_', t('VALUE', 'Vlue')),
                      pattern: {
                        value: /^[+-]?\d*\.?\d+(?:[Ee][+-]?\d+)?$/,
                        message: t(
                          'VALIDATION_ERROR_DECIMAL',
                          'Invalid decimal'
                        ).replace('_attribute_', t('VALUE', 'Vlue'))
                      }
                    })}
                  />
                )}
                {selectedMetaKey === 'boolean' && (
                  <FirstSelect
                    className='select-input'
                    defaultValue={selectedBoolean || '1'}
                    options={booleanOptions}
                    onChange={(val) => setSelectedBoolean(val)}
                  />
                )}
                {selectedMetaKey === 'json' && (
                  <div className='json_editor'>
                    <Editor
                      value={json}
                      onChange={(v) => handleChangeJson(v)}
                    />
                  </div>
                )}
                <IconButton
                  color='primary'
                  type='submit'
                >
                  <BsPlusSquare />
                </IconButton>
              </div>
            </MetaAddContainer>
          </MetaAddForm>
          {actionState.loading && (
            <WrapperSpinnerLoader>
              <SpinnerLoader />
            </WrapperSpinnerLoader>
          )}
        </WrapMetaFields>
      )}
      <Alert
        title={t('ERROR')}
        content={alertState.content}
        acceptText={t('ACCEPT')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </>
  )
}

export const BusinessPromotionCustomFields = (props) => {
  const MetaFieldsProps = {
    ...props,
    asDashboard: true,
    UIComponent: BusinessPromotionCustomFieldsUI
  }
  return <BusinessPromotionMetaFieldsController {...MetaFieldsProps} />
}
