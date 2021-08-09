import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage, useEvent, Settings as SettingsController } from 'ordering-components-admin'
import { SettingItemUI } from '../SettingItemUI'
import { SettingsDetail } from '../SettingsDetail'
import { List as MenuIcon } from 'react-bootstrap-icons'
import { IconButton } from '../../styles/Buttons'
import { useInfoShare } from '../../../../../contexts/InfoShareContext'

import {
  BasicSettingsContainer,
  HeaderTitleContainer,
  ContentWrapper,
  SettingItemWrapper
} from './styles'

const SettingsUI = (props) => {
  const {
    categoryList,
    settingsType
  } = props

  const [, t] = useLanguage()
  const [{ isCollapse }, { handleMenuCollapse }] = useInfoShare()

  const [isOpenDescription, setIsOpenDescription] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { search } = useLocation()

  let category

  if (search) {
    const data = search.substring(1).split('&')
    category = data[0]
  }

  const categoryId = category && category.split('=')[1]
  const [events] = useEvent()

  const onBasicSettingsRedirect = ({ category }) => {
    if (!category) {
      if (settingsType === 'basic') return events.emit('go_to_page', { page: 'basicSettings', replace: true })
      if (settingsType === 'operation') return events.emit('go_to_page', { page: 'operationSettings', replace: true })
    }
    if (category) {
      events.emit('go_to_page', {
        page: settingsType === 'basic' ? 'basicSettings' : 'operationSettings',
        search: `?category=${category}`,
        replace: true
      })
    }
  }

  const handleOpenDescription = (category) => {
    setIsOpenDescription(true)
    setSelectedCategory(category)
    onBasicSettingsRedirect({ category: category.id })
  }

  const handleBackRedirect = () => {
    setIsOpenDescription(false)
    setSelectedCategory(null)
    onBasicSettingsRedirect({ category: null })
  }

  useEffect(() => {
    if (categoryId) {
      onBasicSettingsRedirect({ category: categoryId })
      setIsOpenDescription(true)
    } else {
      setIsOpenDescription(false)
    }
  }, [])

  useEffect(() => {
    if (categoryId && categoryList?.categories?.length > 0) {
      const categorySelected = categoryList?.categories.find(item => item.id === parseInt(categoryId))
      setSelectedCategory(categorySelected)
    }
  }, [categoryList?.categories])

  return (
    <>
      <BasicSettingsContainer>
        <HeaderTitleContainer>
          {isCollapse && (
            <IconButton
              color='black'
              onClick={() => handleMenuCollapse(false)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <h1>
            {
              settingsType === 'basic' ? t('BASIC_SETTINGS', 'Basic settings ') : t('OPERATION_SETTINGS', 'Operation settings ')
            }
          </h1>
        </HeaderTitleContainer>
        <ContentWrapper className='row'>
          {
            categoryList.loading ? (
              [...Array(12).keys()].map(i => (
                <SettingItemWrapper className='col-md-4 col-sm-6' key={i}>
                  <SettingItemUI isSkeleton />
                </SettingItemWrapper>
              ))
            ) : (
              categoryList.categories.map((category, i) => (
                <SettingItemWrapper
                  key={i}
                  className='col-md-4 col-sm-6'
                  onClick={() => handleOpenDescription(category)}
                >
                  <SettingItemUI
                    category={category}
                    active={selectedCategory?.id === category?.id}
                  />
                </SettingItemWrapper>
              ))
            )
          }
        </ContentWrapper>
      </BasicSettingsContainer>
      {
        isOpenDescription && (
          <SettingsDetail
            open={isOpenDescription}
            category={selectedCategory}
            onClose={handleBackRedirect}
            onBasicSettingsRedirect={onBasicSettingsRedirect}
          />
        )
      }
    </>
  )
}

export const Settings = (props) => {
  const settingsProps = {
    ...props,
    UIComponent: SettingsUI
  }
  return (
    <SettingsController {...settingsProps} />
  )
}
