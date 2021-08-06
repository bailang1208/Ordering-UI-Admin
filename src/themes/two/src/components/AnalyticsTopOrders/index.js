import React, { useRef } from 'react'
import { useLanguage } from 'ordering-components-admin'
import {
  Container,
  AnalyticsTopOrdersHeader,
  ActionBlock,
  TopOrdersContainerWrapper,
  TopOrdersContent,
  SkeletonContainerWrapper,
  PercentContainer,
  EmptyContent,
  ProductCategoryContainer
} from './styles'
import BsDownload from '@meronex/icons/bs/BsDownload'
import Skeleton from 'react-loading-skeleton'
import * as htmlToImage from 'html-to-image'

export const AnalyticsTopOrders = (props) => {
  const {
    dataList
  } = props

  const [, t] = useLanguage()
  const downloadElementRef = useRef(null)

  const downloadImage = () => {
    if (!downloadElementRef?.current) return
    htmlToImage.toPng(downloadElementRef?.current)
      .then(function (dataUrl) {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `${t('TOP_ORDERS', 'Top Orders')}.png`
        // Trigger the download
        a.click()
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  }

  return (
    <Container>
      <AnalyticsTopOrdersHeader>
        <p>{t('TOP_ORDERS', 'Top Orders')}</p>
        <ActionBlock disabled={dataList?.data.length === 0}>
          <BsDownload onClick={downloadImage} />
        </ActionBlock>
      </AnalyticsTopOrdersHeader>
      {
        dataList?.loading ? (
          <SkeletonContainerWrapper>
            {
              [...Array(5).keys()].map(i => (
                <div key={i}>
                  <Skeleton height={30} />
                </div>
              ))
            }
          </SkeletonContainerWrapper>
        ) : (
          <TopOrdersContainerWrapper>
            {
              dataList?.data.length > 0 ? (
                <ProductCategoryContainer ref={downloadElementRef}>
                  {
                    dataList?.data.map((item, i) => (
                      <TopOrdersContent key={i}>
                        <p>{item?.name}</p>
                        <PercentContainer percent={item?.orders_count}>{item?.orders_count}%</PercentContainer>
                      </TopOrdersContent>
                    ))
                  }
                </ProductCategoryContainer>
              ) : (
                <EmptyContent>{t('NO_DATA', 'No Data')}</EmptyContent>
              )
            }
          </TopOrdersContainerWrapper>
        )
      }

    </Container>
  )
}