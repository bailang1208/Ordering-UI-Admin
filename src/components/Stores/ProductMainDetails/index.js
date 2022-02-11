import React, { useState } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { DragScroll } from '../../Shared'
import { SeoOptions } from '../SeoOptions'
import { ProductDetatilsInformation } from '../ProductDetatilsInformation'
import { ProductDetailsAdvanced } from '../ProductDetailsAdvanced'
import {
  Container,
  TabsConatiner,
  Tab
} from './styles'

export const ProductMainDetails = (props) => {
  const {
    product,
    formState,
    handlechangeImage,
    handleChangeInput,
    handleChangeFormState,
    handleUpdateClick,

    business,
    handleSuccessUpdate,
    setFormTaxState,
    formTaxState,
    taxes,
    setTaxes,
    fees,
    setFees
  } = props
  const [, t] = useLanguage()

  const [selectedOption, setSelectedOption] = useState('information')
  const listOptions = [
    { key: 'information', content: t('INFORMATION', 'Information') },
    { key: 'advanced', content: t('ADVANCED', 'Advanced') },
    // { key: 'labels', content: t('LABELS', 'Labels') },
    { key: 'seo_options', content: t('SEO_OPTIONS', 'SEO options') }
  ]
  return (
    <Container>
      <h1>{t('PRODUCT_DETAILS', 'Product details')}</h1>
      <TabsConatiner>
        <DragScroll>
          {listOptions.map(option => (
            <Tab
              key={option.key}
              active={selectedOption === option.key}
              onClick={() => setSelectedOption(option.key)}
            >
              {option.content}
            </Tab>
          ))}
        </DragScroll>
      </TabsConatiner>
      {selectedOption === 'information' && (
        <ProductDetatilsInformation
          product={product}
          formState={formState}
          handlechangeImage={handlechangeImage}
          handleChangeInput={handleChangeInput}
          handleChangeFormState={handleChangeFormState}
          handleButtonUpdateClick={handleUpdateClick}
        />
      )}
      {selectedOption === 'advanced' && (
        <ProductDetailsAdvanced
          product={product}
          business={business}
          handleSuccessUpdate={handleSuccessUpdate}
          setFormTaxState={setFormTaxState}
          formTaxState={formTaxState}
          taxes={taxes}
          setTaxes={setTaxes}
          fees={fees}
          setFees={setFees}
        />
      )}
      {selectedOption === 'seo_options' && (
        <SeoOptions
          data={product}
          formState={formState}
          setFormState={handleChangeFormState}
          handleUpdateClick={handleUpdateClick}
          handlechangeImageProductCategory={handlechangeImage}
          handleProductCategoryChangeInput={handleChangeInput}
          isProductSeo
        />
      )}
    </Container>
  )
}