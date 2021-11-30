import React, { useRef, useState, useEffect } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { SingleBusinessSubCateogries } from '../SingleBusinessSubCateogries'

import {
  CategoryListContainer,
  HeaderContainer,
  ListContent,
  AddCategory
} from './styles'

export const BusinessProductsCategories = (props) => {
  const {
    businessState,
    categorySelected,
    handleChangeCategory,
    handleOpenCategoryDetails,
    actionsGroupRef,
    productsContainerRef,
    productDetailsRef
  } = props

  const [, t] = useLanguage()
  const [dataSelected, setDataSelected] = useState('')
  const containerRef = useRef()

  useEffect(() => {
    let listener
    if (containerRef?.current && productsContainerRef && actionsGroupRef && productDetailsRef) {
      listener = window.addEventListener('click', (e) => {
        if (!containerRef?.current?.contains(e.target) && !productDetailsRef && !actionsGroupRef?.contains(e.target) && !productsContainerRef?.contains(e.target)) {
          handleChangeCategory(null, null)
        }
      })
    }
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [containerRef?.current, productDetailsRef])

  return (
    <>
      <CategoryListContainer ref={containerRef}>
        <HeaderContainer>
          <h1>{t('BUSINESS_CATEGORY', 'Business category')}</h1>
        </HeaderContainer>
        <ListContent>
          {
            businessState.loading && (
              [...Array(6).keys()].map(i => (
                <SingleBusinessSubCateogries key={i} isSkeleton />
              ))
            )
          }
          {businessState?.business?.categories?.length && (
            businessState?.business.categories.sort((a, b) => a.rank - b.rank).map(category => (
              <SingleBusinessSubCateogries
                {...props}
                index={0}
                key={category.id}
                category={category}
                categorySelected={categorySelected}
                handleChangeCategory={handleChangeCategory}
                business={businessState?.business}
                dataSelected={dataSelected}
                onDataSelected={setDataSelected}
              />
            ))
          )}
        </ListContent>
        <AddCategory onClick={() => handleOpenCategoryDetails()}>{t('ADD_NEW_CATEGORY', 'Add new category')}</AddCategory>
      </CategoryListContainer>
    </>
  )
}
