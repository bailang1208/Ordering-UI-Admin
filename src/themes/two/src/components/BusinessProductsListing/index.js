import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useLanguage, BusinessProductsListing as BusinessProductsListingController } from 'ordering-components-admin'
import { BusinessCategoryEdit } from '../BusinessCategoryEdit'
import { SearchBar } from '../SearchBar'
import BsPlusSquare from '@meronex/icons/bs/BsPlusSquare'
import BsViewList from '@meronex/icons/bs/BsViewList'
import BsTable from '@meronex/icons/bs/BsTable'
import { BusinessProductsCategories } from '../BusinessProductsCategories'
import { BusinessProductList } from '../BusinessProductList'
import { ProductDetails } from '../ProductDetails'

import {
  CategoryProductsContainer,
  HeaderContainer,
  CategoryProductsContent,
  CategoryListContainer,
  ProductListContainer,
  ProductHeader,
  AddButton,
  ActionIconList,
  ViewMethodButton
} from './styles'

const BusinessProductsListingUI = (props) => {
  const {
    categorySelected,
    searchValue,
    handleChangeCategory,
    handleChangeSearch,
    featuredProducts,
    businessState,
    onProductRedirect,
    slug,
    categoryId,
    handleUpdateBusinessState,
    setCategorySelected
  } = props
  const [, t] = useLanguage()

  const [viewMethod, setViewMethod] = useState('list')
  const [categoryToEdit, setCategoryToEdit] = useState({ open: false, category: null })
  const [openProductDetails, setOpenProductDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductAdd, setIsProductAdd] = useState(false)

  const handleOpenCategoryDetails = (category = null) => {
    if (category && category?.id !== null) {
      onProductRedirect && onProductRedirect({
        slug: slug,
        category: category?.id,
        product: null
      })
      setCategorySelected(category)
      setCategoryToEdit({
        open: true,
        category: { ...category }
      })
    } else {
      setCategoryToEdit({
        open: true,
        category: null
      })
    }
  }

  const handleCloseEdit = () => {
    onProductRedirect && onProductRedirect({
      slug: slug,
      category: null,
      product: null
    })
    setCategoryToEdit({
      open: false,
      category: null
    })
  }

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product)
    setOpenProductDetails(true)
  }

  const handleCloseProductDetails = () => {
    setOpenProductDetails(false)
  }

  const handleProductAdd = (status) => {
    if (viewMethod !== 'list') return
    setIsProductAdd(status)
  }

  useEffect(() => {
    if (categoryId) {
      setCategoryToEdit({
        ...categoryToEdit,
        open: true
      })
    }
  }, [categoryId])

  return (
    <>
      <CategoryProductsContainer>
        <HeaderContainer>
          <div>
            {
              businessState.loading ? (
                <h1><Skeleton width={200} height={30} /></h1>
              ) : (
                businessState?.business?.name && (
                  <h1>{businessState?.business?.name}</h1>
                )
              )
            }
          </div>
          <SearchBar
            isCustomLayout
            search={searchValue}
            onSearch={handleChangeSearch}
            placeholder={t('SEARCH', 'Search')}
          />
        </HeaderContainer>
        <CategoryProductsContent>
          <CategoryListContainer>
            {
              <BusinessProductsCategories
                {...props}
                businessState={businessState}
                categorySelected={categorySelected}
                onClickCategory={handleChangeCategory}
                featured={featuredProducts}
                handleOpenCategoryDetails={handleOpenCategoryDetails}
              />
            }
          </CategoryListContainer>
          <ProductListContainer>
            <ProductHeader>
              <div className='d-flex align-items-center'>
                <h1>{categorySelected?.name || t('ALL', 'All')}</h1>
                <AddButton onClick={() => handleProductAdd(true)}>
                  <BsPlusSquare />
                </AddButton>
              </div>

              <ActionIconList>
                <ViewMethodButton
                  active={viewMethod === 'list'}
                  onClick={() => setViewMethod('list')}
                >
                  <BsViewList />
                </ViewMethodButton>
                <ViewMethodButton
                  active={viewMethod === 'spreedsheet'}
                  onClick={() => setViewMethod('spreedsheet')}
                >
                  <BsTable />
                </ViewMethodButton>
              </ActionIconList>
            </ProductHeader>
            <BusinessProductList
              {...props}
              productDetailsId={selectedProduct?.id}
              viewMethod={viewMethod}
              handleOpenProductDetails={handleOpenProductDetails}
              handleParentProductAdd={handleProductAdd}
              isParentProductAdd={isProductAdd}
            />
          </ProductListContainer>
        </CategoryProductsContent>
      </CategoryProductsContainer>
      {
        categoryToEdit?.open && (
          <BusinessCategoryEdit
            {...props}
            open={categoryToEdit?.open}
            onClose={handleCloseEdit}
            category={categoryToEdit?.category}
            businessState={businessState}
          />
        )
      }

      {openProductDetails && (
        <ProductDetails
          open={openProductDetails}
          onClose={handleCloseProductDetails}
          product={selectedProduct}
          business={businessState?.business}
          handleUpdateBusinessState={handleUpdateBusinessState}
        />
      )}
    </>
  )
}

export const BusinessProductsListing = (props) => {
  const [isInitialRender, setIsInitialRender] = useState(false)

  const businessProductslistingProps = {
    ...props,
    UIComponent: BusinessProductsListingUI,
    isInitialRender,
    handleUpdateInitialRender: (val) => setIsInitialRender(val)
  }
  return (
    <BusinessProductsListingController {...businessProductslistingProps} />
  )
}