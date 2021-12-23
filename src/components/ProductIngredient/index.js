import React, { useState } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { Button } from '../../styles/Buttons'
import { useWindowSize } from '../../hooks/useWindowSize'
import { ProductIngredientDetails } from '../ProductIngredientDetails'
import { Modal } from '../Modal'

import {
  MainContainer,
  IngredientContainer,
  Header,
  IngredientOption,
  AddIngredientButton
} from './styles'

export const ProductIngredient = (props) => {
  const {
    product,
    setIsExtendExtraOpen
  } = props

  const [, t] = useLanguage()
  const { width } = useWindowSize()
  const [openDetails, setOpenDetails] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState(null)

  const handleOpenIngredient = (ingredient) => {
    setCurrentIngredient(ingredient)
    setIsExtendExtraOpen(true)
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
    setIsExtendExtraOpen(false)
  }

  return (
    <MainContainer>
      <IngredientContainer>
        <Header>
          <h1>{t('INGREDIENTS', 'Ingredients')} / {t('PROPERTIES', 'Properties')}</h1>
          <Button
            borderRadius='8px'
            color='lightPrimary'
            onClick={() => handleOpenIngredient(null)}
          >
            {t('ADD_INGREDIENT', 'Add ingredient')}
          </Button>
        </Header>
        {product?.ingredients && product?.ingredients.map(ingredient => (
          <IngredientOption
            key={ingredient.id}
            onClick={() => handleOpenIngredient(ingredient)}
          >
            {ingredient?.name}
          </IngredientOption>
        ))}
        <AddIngredientButton
          onClick={() => handleOpenIngredient(null)}
        >
          {t('ADD_INGREDIENT', 'Add ingredient')}
        </AddIngredientButton>
      </IngredientContainer>

      {width >= 1000 ? (
        <>
          {openDetails && (
            <ProductIngredientDetails
              {...props}
              ingredient={currentIngredient}
              onClose={() => handleCloseDetails()}
            />
          )}
        </>
      ) : (
        <Modal
          width='80%'
          open={openDetails}
          onClose={() => handleCloseDetails()}
        >
          <ProductIngredientDetails
            {...props}
            ingredient={currentIngredient}
            onClose={() => handleCloseDetails()}
          />
        </Modal>
      )}
    </MainContainer>
  )
}
