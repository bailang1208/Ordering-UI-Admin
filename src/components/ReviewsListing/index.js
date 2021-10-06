import React, { useState } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { useInfoShare } from '../../contexts/InfoShareContext'
import { List as MenuIcon } from 'react-bootstrap-icons'
import { SearchBar } from '../SearchBar'
import { IconButton } from '../../styles'
import { BusinessReviewList } from '../BusinessReviewList'
import { DriversReviewList } from '../DriversReviewList'

import {
  ReviewsListingContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  Tabs,
  Tab
} from './styles'

export const ReviewsListing = (props) => {
  const [, t] = useLanguage()
  const [{ isCollapse }, { handleMenuCollapse }] = useInfoShare()
  const [showOption, setShowOption] = useState('business')
  const [searchValue, setSearchValue] = useState(null)

  return (
    <>
      <ReviewsListingContainer>
        <Header>
          <HeaderLeft>
            {isCollapse && (
              <IconButton
                color='black'
                onClick={() => handleMenuCollapse(false)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <h1>{t('REVIEWS_MANAGER', 'Reviews manager')}</h1>
          </HeaderLeft>
          <HeaderRight>
            <SearchBar
              placeholder={t('SEARCH', 'Search')}
              searchValue={searchValue}
              onSearch={val => setSearchValue(val)}
            />
          </HeaderRight>
        </Header>
        <Tabs>
          <Tab
            active={showOption === 'business'}
            onClick={() => setShowOption('business')}
          >
            {t('BUSINESS', 'Business')}
          </Tab>
          <Tab
            active={showOption === 'drivers'}
            onClick={() => setShowOption('drivers')}
          >
            {t('DRIVERS', 'Drivers')}
          </Tab>
        </Tabs>
        {showOption === 'business' && (
          <BusinessReviewList parentSearchValue={searchValue} />
        )}
        {showOption === 'drivers' && (
          <DriversReviewList parentSearchValue={searchValue} />
        )}
      </ReviewsListingContainer>
    </>
  )
}
