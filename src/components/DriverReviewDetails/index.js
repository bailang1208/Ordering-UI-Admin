import React from 'react'
import { useLanguage, useUtils, DriverReviewDetails as DriverReviewDetailsController } from 'ordering-components-admin'
import { PersonFill } from 'react-bootstrap-icons'
import Skeleton from 'react-loading-skeleton'

import {
  ReviewDetailsContainer,
  Header,
  DriverPhotoContainer,
  WrapperImage,
  Image,
  ReviewItemContatiner,
  ReviewQualityContainer,
  ReviewBarContainer,
  ReviewBar,
  ReviewQualityTextContainer,
  Comment,
  NotReviewed
} from './styles'

const DriverReviewDetailsUI = (props) => {
  const {
    driver,
    driverReviewState
  } = props

  const [, t] = useLanguage()
  const [{ optimizeImage }] = useUtils()

  const getReviewPercent = (quality) => {
    switch (quality) {
      case 1:
        return 0
      case 2:
        return 25
      case 3:
        return 50
      case 4:
        return 75
      case 5:
        return 100
      default:
        return quality / 5 * 100
    }
  }

  return (
    <>
      <ReviewDetailsContainer>
        <Header>
          <h1>{driver?.name} {driver?.lastname}</h1>
        </Header>
        <DriverPhotoContainer>
          <WrapperImage>
            {driver?.photo ? (
              <Image bgimage={optimizeImage(driver?.photo)} />
            ) : (
              <PersonFill />
            )}
          </WrapperImage>
        </DriverPhotoContainer>
        {driverReviewState.loading ? (
          [...Array(5).keys()].map(i => (
            <ReviewItemContatiner key={i}>
              <ReviewQualityContainer>
                <ReviewBarContainer>
                  <Skeleton height={10} />
                </ReviewBarContainer>
              </ReviewQualityContainer>
              <ReviewQualityTextContainer>
                <p><Skeleton width={40} /></p>
                <p><Skeleton width={40} /></p>
                <p><Skeleton width={40} /></p>
                <p><Skeleton width={40} /></p>
                <p><Skeleton width={40} /></p>
              </ReviewQualityTextContainer>
              <Comment>
                <div><Skeleton width={300} /></div>
                <div><Skeleton width={200} /></div>
              </Comment>
            </ReviewItemContatiner>
          ))
        ) : (
          driverReviewState?.reviews.map(review => (
            <ReviewItemContatiner key={review?.id}>
              <ReviewQualityContainer>
                <ReviewBarContainer>
                  <ReviewBar
                    percentage={getReviewPercent(review?.qualification)}
                  />
                </ReviewBarContainer>
                <ReviewQualityTextContainer>
                  <p>{t('TERRIBLE', 'Terrible')}</p>
                  <p>{t('BAD', 'Bad')}</p>
                  <p>{t('OKAY', 'Okay')}</p>
                  <p>{t('GOOD', 'Good')}</p>
                  <p>{t('GREAT', 'Great')}</p>
                </ReviewQualityTextContainer>
              </ReviewQualityContainer>
              <Comment>{review?.comment}</Comment>
            </ReviewItemContatiner>
          ))
        )}

        {!driverReviewState.loading && driverReviewState.reviews.length === 0 && (
          <NotReviewed>
            {t('ERROR_REVIEW_FIND', 'The review does not exist.')}
          </NotReviewed>
        )}
      </ReviewDetailsContainer>
    </>
  )
}

export const DriverReviewDetails = (props) => {
  const driverReivewDetailsProps = {
    ...props,
    UIComponent: DriverReviewDetailsUI
  }
  return <DriverReviewDetailsController {...driverReivewDetailsProps} />
}
