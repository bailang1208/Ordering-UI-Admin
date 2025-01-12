import React, { useState, useEffect } from 'react'
import { useLanguage, BusinessWalletsList as BusinessWalletsListController } from 'ordering-components-admin'
import { ChevronRight } from 'react-bootstrap-icons'
import { SideBar } from '../../Shared'
import { Select } from '../../../styles/Select/FirstSelect'

import {
  WalletsListContainer,
  WalletOption,
  WalletName,
  Option,
  DetailsContainer
} from './styles'

const BusinessWalletsListUI = (props) => {
  const {
    walletsListState,
    setIsExtendExtraOpen,
    setIsOpenWalletDetails,
    isClose,
    handleClosePaymethodDetails,
    handleUpdateWallet
  } = props

  const [, t] = useLanguage()
  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const [currentConfig, setCurrentConfig] = useState(null)
  const [options, setOptions] = useState(null)

  const handleOpenWallet = (config) => {
    setIsOpenWalletDetails(true)
    handleClosePaymethodDetails()
    setCurrentConfig(config)
    setIsExtendExtraOpen(true)
    setIsOpenDetails(true)
  }
  const handleCloseWallet = () => {
    setIsOpenWalletDetails(false)
    setIsOpenDetails(false)
    setIsExtendExtraOpen(false)
    setCurrentConfig(null)
  }

  useEffect(() => {
    if (!isOpenDetails || !currentConfig?.options) return
    const selectedTypes = currentConfig.options?.map(item => {
      return { value: item.value, content: <Option>{t(item.text.toUpperCase())}</Option> }
    })
    setOptions(selectedTypes)
  }, [currentConfig, isOpenDetails])

  useEffect(() => {
    if (!isClose) return
    setIsOpenWalletDetails(false)
    setIsOpenDetails(false)
    setCurrentConfig(null)
  }, [isClose])

  return (
    <>
      {walletsListState.wallets.length > 0 && (
        <WalletsListContainer>
          <h2>{t('WALLETS', 'Wallets')}</h2>
          {walletsListState.wallets.map(config => (
            <WalletOption
              key={config.id}
              active={config.id === currentConfig?.id}
              onClick={() => handleOpenWallet(config)}
            >
              <WalletName>{config.name}</WalletName>
              <ChevronRight />
            </WalletOption>
          ))}
        </WalletsListContainer>
      )}
      {isOpenDetails && (
        <SideBar
          isBorderShow
          open={isOpenDetails}
          onClose={handleCloseWallet}
        >
          <DetailsContainer>
            <h2>{currentConfig?.name}</h2>
            {currentConfig?.type === 2 && options && (
              <Select
                defaultValue={currentConfig?.value}
                options={options}
                onChange={(typeValue) => handleUpdateWallet(currentConfig?.id, { value: typeValue })}
                placeholder={t('SELECT_A_OPTION', 'Select a option')}
              />
            )}
          </DetailsContainer>
        </SideBar>
      )}
    </>
  )
}

export const BusinessWalletsList = (props) => {
  const businessWalletsListProps = {
    ...props,
    UIComponent: BusinessWalletsListUI
  }
  return <BusinessWalletsListController {...businessWalletsListProps} />
}
