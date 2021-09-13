import React from 'react'
import Skeleton from 'react-loading-skeleton'
import {
  SettingItemContainer,
  TitleContainer,
  IconWrapper,
  SettingItemContent,
  Title,
  SettingItemDescription
} from './styles'

export const SettingItemUI = (props) => {
  const {
    isSkeleton,
    active,
    icon,
    title,
    description
  } = props

  return (
    <SettingItemContainer active={!isSkeleton && active}>
      <IconWrapper>
        {
          isSkeleton
            ? <Skeleton width={24} height={24} />
            : icon
        }
      </IconWrapper>
      <SettingItemContent>
        {
          isSkeleton
            ? <Skeleton />
            : (
              <TitleContainer>
                <Title>{title}</Title>
              </TitleContainer>
            )
        }
        {
          isSkeleton
            ? <Skeleton height={50} />
            : (
              <SettingItemDescription>{description}</SettingItemDescription>
            )
        }
      </SettingItemContent>
    </SettingItemContainer>
  )
}
