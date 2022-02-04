import React, { useEffect, useState } from 'react'
import RiCheckboxBlankLine from '@meronex/icons/ri/RiCheckboxBlankLine'
import RiCheckboxFill from '@meronex/icons/ri/RiCheckboxFill'
import FaUserAlt from '@meronex/icons/fa/FaUserAlt'
import Skeleton from 'react-loading-skeleton'
import {
  useLanguage,
  useUtils
} from 'ordering-components-admin'
import { useTheme } from 'styled-components'
import { DriverSelector } from '../DriverSelector'
import { ColumnAllowSettingPopover } from '../ColumnAllowSettingPopover'
import { Pagination } from '../Pagination'
import {
  OrdersContainer,
  Table,
  OrderTbody,
  OrderNumberContainer,
  CheckBox,
  WrapperImage,
  Image,
  BusinessInfo,
  CustomerInfo,
  DriversInfo,
  OrderType,
  WrapOrderStatusSelector,
  WrapperPagination,
  StatusInfo
} from './styles'

export const OrdersTable = (props) => {
  const {
    isSelectedOrders,
    orderList,
    driversList,
    pagination,
    selectedOrderIds,
    orderDetailId,
    getPageOrders,
    handleSelectedOrderIds,
    handleOpenOrderDetail,
    setSelectedOrderIds,
    currentTourStep,
    isTourOpen,
    handleOpenTour
  } = props
  const [, t] = useLanguage()
  const theme = useTheme()
  const [{ parsePrice, parseDate, optimizeImage }] = useUtils()

  const [isAllChecked, setIsAllChecked] = useState(false)

  const handleChangePage = (page) => {
    getPageOrders(pagination.pageSize, page)
  }

  const handleChangePageSize = (pageSize) => {
    const expectedPage = Math.ceil(pagination.from / pageSize)
    getPageOrders(pageSize, expectedPage)
  }

  const [openPopover, setOpenPopover] = useState(false)
  const [allowColumns, setAllowColumns] = useState({
    status: true,
    orderNumber: true,
    dateTime: true,
    business: true,
    customer: true,
    driver: true,
    advanced: true,
    total: true
  })

  const optionsDefault = [
    {
      value: 'status',
      content: t('STATUS', 'Status')
    },
    {
      value: 'orderNumber',
      content: t('INVOICE_ORDER_NO', 'Order No.')
    },
    {
      value: 'dateTime',
      content: t('DATE_TIME', 'Date and time')
    },
    {
      value: 'business',
      content: t('BUSINESS', 'Business')
    },
    {
      value: 'customer',
      content: t('CUSTOMER', 'Customer')
    },
    {
      value: 'driver',
      content: t('DRIVER', 'Driver')
    },
    {
      value: 'advanced',
      content: t('ADVANCED_LOGISTICS', 'Advance Logistics')
    },
    {
      value: 'total',
      content: t('EXPORT_TOTAL', 'Total')
    }
  ]

  const getLogisticTag = (status) => {
    switch (parseInt(status)) {
      case 0:
        return t('PENDING', 'Pending')
      case 1:
        return t('IN_PROGRESS', 'In progress')
      case 2:
        return t('IN_QUEUE', 'In queue')
      case 3:
        return t('EXPIRED', 'Expired')
      case 4:
        return t('RESOLVED', 'Resolved')
      default:
        return t('UNKNOWN', 'Unknown')
    }
  }

  const getPriorityTag = (priority) => {
    switch (parseInt(priority)) {
      case -1:
        return t('LOW', 'Low')
      case 0:
        return t('NORMAL', 'Normal')
      case 1:
        return t('HIGH', 'High')
      case 2:
        return t('URGENT', 'Urgent')
      default:
        return t('UNKNOWN', 'Unknown')
    }
  }

  const getOrderStatus = (s) => {
    const status = parseInt(s)
    const orderStatus = [
      { key: 0, value: t('PENDING', theme?.defaultLanguages?.PENDING || 'Pending') },
      { key: 1, value: t('COMPLETED_BY_ADMIN', theme?.defaultLanguages?.COMPLETED || 'Completed by admin') },
      { key: 2, value: t('REJECTED', theme?.defaultLanguages?.REJECTED || 'Rejected') },
      { key: 3, value: t('ORDER_STATUS_IN_BUSINESS', theme?.defaultLanguages?.DRIVER_IN_BUSINESS || 'Driver arrived to business') },
      { key: 4, value: t('PREPARATION_COMPLETED', theme?.defaultLanguages?.PREPARATION_COMPLETED || 'Preparation Completed') },
      { key: 5, value: t('REJECTED_BY_BUSINESS', theme?.defaultLanguages?.REJECTED_BY_BUSINESS || 'Rejected by business') },
      { key: 6, value: t('REJECTED_BY_DRIVER', theme?.defaultLanguages?.REJECTED_BY_DRIVER || 'Rejected by Driver') },
      { key: 7, value: t('ACCEPTED_BY_BUSINESS', theme?.defaultLanguages?.ACCEPTED_BY_BUSINESS || 'Accepted by business') },
      { key: 8, value: t('ACCEPTED_BY_DRIVER', theme?.defaultLanguages?.ACCEPTED_BY_DRIVER || 'Accepted by driver') },
      { key: 9, value: t('PICK_UP_COMPLETED_BY_DRIVER', theme?.defaultLanguages?.PICK_UP_COMPLETED_BY_DRIVER || 'Pick up completed by driver') },
      { key: 10, value: t('PICK_UP_FAILED_BY_DRIVER', theme?.defaultLanguages?.PICK_UP_FAILED_BY_DRIVER || 'Pick up Failed by driver') },
      { key: 11, value: t('DELIVERY_COMPLETED_BY_DRIVER', theme?.defaultLanguages?.DELIVERY_COMPLETED_BY_DRIVER || 'Delivery completed by driver') },
      { key: 12, value: t('DELIVERY_FAILED_BY_DRIVER', theme?.defaultLanguages?.DELIVERY_FAILED_BY_DRIVER || 'Delivery Failed by driver') },
      { key: 13, value: t('PREORDER', theme?.defaultLanguages?.PREORDER || 'PreOrder') },
      { key: 14, value: t('ORDER_NOT_READY', theme?.defaultLanguages?.ORDER_NOT_READY || 'Order not ready') },
      { key: 15, value: t('ORDER_PICKEDUP_COMPLETED_BY_CUSTOMER', theme?.defaultLanguages?.ORDER_PICKEDUP_COMPLETED_BY_CUSTOMER || 'Order picked up completed by customer') },
      { key: 16, value: t('ORDER_STATUS_CANCELLED_BY_CUSTOMER', theme?.defaultLanguages?.ORDER_STATUS_CANCELLED_BY_CUSTOMER || 'Order cancelled by customer') },
      { key: 17, value: t('ORDER_NOT_PICKEDUP_BY_CUSTOMER', theme?.defaultLanguages?.ORDER_NOT_PICKEDUP_BY_CUSTOMER || 'Order not picked up by customer') },
      { key: 18, value: t('ORDER_DRIVER_ALMOST_ARRIVED_BUSINESS', theme?.defaultLanguages?.ORDER_DRIVER_ALMOST_ARRIVED_BUSINESS || 'Driver almost arrived to business') },
      { key: 19, value: t('ORDER_DRIVER_ALMOST_ARRIVED_CUSTOMER', theme?.defaultLanguages?.ORDER_DRIVER_ALMOST_ARRIVED_CUSTOMER || 'Driver almost arrived to customer') },
      { key: 20, value: t('ORDER_CUSTOMER_ALMOST_ARRIVED_BUSINESS', theme?.defaultLanguages?.ORDER_CUSTOMER_ALMOST_ARRIVED_BUSINESS || 'Customer almost arrived to business') },
      { key: 21, value: t('ORDER_CUSTOMER_ARRIVED_BUSINESS', theme?.defaultLanguages?.ORDER_CUSTOMER_ARRIVED_BUSINESS || 'Customer arrived to business') }
    ]

    const objectStatus = orderStatus.find((o) => o.key === status)

    return objectStatus && objectStatus
  }

  const handleChangeAllowColumns = (type) => {
    setAllowColumns({
      ...allowColumns,
      [type]: !allowColumns[type]
    })
  }

  const handleClickOrder = (order, e) => {
    const inValid = !isSelectedOrders && (e.target.closest('.orderCheckBox') || e.target.closest('.driverInfo') || e.target.closest('.orderStatusTitle'))
    if (inValid) return
    handleOpenOrderDetail(order)
  }

  const handleSelecteAllOrder = () => {
    const orderIds = orderList.orders.reduce((ids, order) => [...ids, order.id], [])
    if (!isAllChecked) {
      setSelectedOrderIds([...selectedOrderIds, ...orderIds])
    } else {
      const orderIdsToDeleteSet = new Set(orderIds)
      const updatedSelectedOrderIds = selectedOrderIds.filter((name) => {
        return !orderIdsToDeleteSet.has(name)
      })
      setSelectedOrderIds(updatedSelectedOrderIds)
    }
  }

  useEffect(() => {
    if (orderList.loading) return
    const orderIds = orderList.orders.reduce((ids, order) => [...ids, order.id], [])
    const _isAllChecked = orderIds.every(elem => selectedOrderIds.includes(elem))
    setIsAllChecked(_isAllChecked)
  }, [orderList.orders, selectedOrderIds])

  const handleChangeKeyboard = (evt) => {
    if (evt.keyCode === 37 && currentTourStep === 1) handleOpenTour()
    if (evt.keyCode === 37 && currentTourStep === 4) handleOpenOrderDetail(orderList?.orders[0], true)
    if (evt.keyCode === 39 && currentTourStep === 0) handleOpenOrderDetail(orderList?.orders[0])
  }

  useEffect(() => {
    if (!isTourOpen) return
    document.addEventListener('keydown', handleChangeKeyboard)
    return () => document.removeEventListener('keydown', handleChangeKeyboard)
  }, [isTourOpen, currentTourStep])

  return (
    <>
      <OrdersContainer
        isSelectedOrders={isSelectedOrders}
      >
        <Table
          className='orders_table'
          isSelectedOrders={isSelectedOrders}
        >
          <thead>
            <tr>
              <th
                className={!(allowColumns?.orderNumber || allowColumns?.dateTime) ? 'orderNo small' : 'orderNo'}
              >
                <CheckBox
                  isChecked={!orderList.loading && isAllChecked}
                  onClick={() => handleSelecteAllOrder()}
                  className='orderCheckBox'
                >
                  {(!orderList.loading && isAllChecked) ? (
                    <RiCheckboxFill />
                  ) : (
                    <RiCheckboxBlankLine />
                  )}
                </CheckBox>
                {t('ORDER', 'Order')}
              </th>
              {allowColumns?.status && (
                <th className='statusInfo'>{t('STATUS', 'Status')}</th>
              )}
              {allowColumns?.business && (
                <th className='businessInfo'>{t('BUSINESS', 'Business')}</th>
              )}
              {allowColumns?.customer && (
                <th className='customerInfo'>{t('CUSTOMER', 'Customer')}</th>
              )}
              {allowColumns?.driver && (
                <th className='driverInfo'>{t('DRIVER', 'Driver')}</th>
              )}
              {allowColumns?.advanced && (
                <th colSpan={3} className='advanced'>{t('ADVANCED_LOGISTICS', 'Advanced logistics')}</th>
              )}
              <th className='orderPrice'>
                <ColumnAllowSettingPopover
                  open={openPopover}
                  allowColumns={allowColumns}
                  optionsDefault={optionsDefault}
                  onClick={() => setOpenPopover(!openPopover)}
                  onClose={() => setOpenPopover(false)}
                  handleChangeAllowColumns={handleChangeAllowColumns}
                />
              </th>
            </tr>
          </thead>
          {orderList.loading ? (
            [...Array(10).keys()].map(i => (
              <OrderTbody key={i}>
                <tr>
                  <td
                    className={!(allowColumns?.orderNumber || allowColumns?.dateTime) ? 'orderNo small' : 'orderNo'}
                  >
                    <OrderNumberContainer>
                      <CheckBox>
                        <Skeleton width={25} height={25} style={{ margin: '10px' }} />
                      </CheckBox>
                      <div className='info'>
                        {allowColumns?.orderNumber && (
                          <p><Skeleton width={100} /></p>
                        )}
                        {allowColumns?.dateTime && (
                          <Skeleton width={120} />
                        )}
                      </div>
                    </OrderNumberContainer>
                  </td>
                  {allowColumns?.status && (
                    <td className='statusInfo'>
                      <StatusInfo>
                        <div className='info'>
                          <p className='bold'><Skeleton width={100} /></p>
                        </div>
                      </StatusInfo>
                    </td>
                  )}
                  {allowColumns?.business && (
                    <td className='businessInfo'>
                      <BusinessInfo>
                        <Skeleton width={45} height={45} />
                        <div className='info'>
                          <p className='bold'><Skeleton width={80} /></p>
                          <p><Skeleton width={100} /></p>
                        </div>
                      </BusinessInfo>
                    </td>
                  )}
                  {allowColumns?.customer && (
                    <td className='customerInfo'>
                      <CustomerInfo>
                        <Skeleton width={45} height={45} />
                        <div className='info'>
                          <p className='bold'><Skeleton width={100} /></p>
                          <p><Skeleton width={100} /></p>
                        </div>
                      </CustomerInfo>
                    </td>
                  )}
                  {allowColumns?.driver && (
                    <td className='driverInfo'>
                      <DriversInfo className='d-flex align-items-center'>
                        <Skeleton width={45} height={45} />
                        <Skeleton width={100} style={{ margin: '10px' }} />
                      </DriversInfo>
                    </td>
                  )}
                  {allowColumns?.deliveryType && (
                    <td className='orderType'>
                      <OrderType>
                        <Skeleton width={35} height={35} />
                      </OrderType>
                    </td>
                  )}
                  {allowColumns?.status && (
                    <td className='orderStatusTitle'>
                      <WrapOrderStatusSelector>
                        <Skeleton width={100} height={30} />
                      </WrapOrderStatusSelector>
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='logistic'>
                      <div className='info'>
                        <p className='bold'><Skeleton width={60} /></p>
                        <p><Skeleton width={60} /></p>
                      </div>
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='attempts'>
                      <div className='info'>
                        <p className='bold'><Skeleton width={60} /></p>
                        <p><Skeleton width={60} /></p>
                      </div>
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='priority'>
                      <div className='info'>
                        <p className='bold'><Skeleton width={60} /></p>
                        <p><Skeleton width={60} /></p>
                      </div>
                    </td>
                  )}
                  <td className='orderPrice'>
                    <div className='info'>
                      {allowColumns?.total && (
                        <p className='bold'><Skeleton width={60} /></p>
                      )}
                      <p>
                        <Skeleton width={100} />
                      </p>
                    </div>
                  </td>
                </tr>
              </OrderTbody>
            ))
          ) : (
            orderList.orders.map((order, i) => (
              <OrderTbody
                key={i}
                className={parseInt(orderDetailId) === order.id ? 'active' : ''}
                isCustomStyle={isSelectedOrders}
                onClick={(e) => handleClickOrder(order, e)}
                data-tour={i === 0 ? 'tour_start' : ''}
              >
                <tr>
                  <td
                    className={!(allowColumns?.orderNumber || allowColumns?.dateTime) ? 'small' : ''}
                  >
                    <OrderNumberContainer>
                      {!isSelectedOrders && (
                        <CheckBox
                          isChecked={selectedOrderIds.includes(order?.id)}
                          onClick={() => handleSelectedOrderIds(order.id)}
                          className='orderCheckBox'
                        >
                          {selectedOrderIds.includes(order?.id) ? (
                            <RiCheckboxFill />
                          ) : (
                            <RiCheckboxBlankLine />
                          )}
                        </CheckBox>
                      )}
                      <div className='info'>
                        {allowColumns?.orderNumber && (
                          <p className='bold'>{t('INVOICE_ORDER_NO', 'Order No.')} {order?.id}</p>
                        )}
                        {allowColumns?.dateTime && (
                          <p className='date'>
                            {order?.delivery_datetime_utc
                              ? parseDate(order?.delivery_datetime_utc)
                              : parseDate(order?.delivery_datetime, { utc: false })}
                          </p>
                        )}
                      </div>
                    </OrderNumberContainer>
                  </td>
                  {allowColumns?.status && (
                    <td className='statusInfo'>
                      <StatusInfo>
                        <div className='info'>
                          <p className='bold'>{getOrderStatus(order.status)?.value}</p>
                        </div>
                      </StatusInfo>
                    </td>
                  )}
                  {allowColumns?.business && (
                    <td className='businessInfo'>
                      <BusinessInfo>
                        <WrapperImage>
                          <Image bgimage={optimizeImage(order.business?.logo || theme.images?.dummies?.businessLogo, 'h_50,c_limit')} />
                        </WrapperImage>
                        <div className='info'>
                          <p className='bold'>{order?.business?.name}</p>
                          <p>{order?.business?.city?.name}</p>
                        </div>
                      </BusinessInfo>
                    </td>
                  )}
                  {allowColumns?.customer && (
                    <td className='customerInfo'>
                      <CustomerInfo>
                        <WrapperImage>
                          {order?.customer?.photo ? (
                            <Image bgimage={optimizeImage(order?.customer?.photo, 'h_50,c_limit')} />
                          ) : (
                            <FaUserAlt />
                          )}
                        </WrapperImage>
                        <div className='info'>
                          <p className='bold'>{order?.customer?.name}</p>
                          <p>{order?.customer?.cellphone}</p>
                        </div>
                      </CustomerInfo>
                    </td>
                  )}
                  {allowColumns?.driver && (
                    <td>
                      {order?.delivery_type === 1 && (
                        <DriversInfo className='driverInfo'>
                          <DriverSelector
                            orderView
                            padding='5px 0'
                            defaultValue={order?.driver_id ? order.driver_id : 'default'}
                            drivers={driversList.drivers}
                            order={order}
                          />
                        </DriversInfo>
                      )}
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='logistic'>
                      <div className='info'>
                        <p className='bold'>{t('LOGISTIC', 'Logistic')}</p>
                        <p>{getLogisticTag(order?.logistic_status)}</p>
                      </div>
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='attempts'>
                      <div className='info'>
                        <p className='bold'>{t('ATTEMPTS', 'Attempts')}</p>
                        <p>{order?.logistic_attemps}</p>
                      </div>
                    </td>
                  )}
                  {allowColumns?.advanced && (
                    <td className='priority'>
                      <div className='info'>
                        <p className='bold'>{t('PRIORITY', 'Priority')}</p>
                        <p>{getPriorityTag(order?.priority)}</p>
                      </div>
                    </td>
                  )}
                  <td className='orderPrice'>
                    <div className='info'>
                      {allowColumns?.total && (
                        <p className='bold'>{parsePrice(order?.summary?.total)}</p>
                      )}
                      {!(order?.status === 1 || order?.status === 11 || order?.status === 2 || order?.status === 5 || order?.status === 6 || order?.status === 10 || order.status === 12) && (
                        <TimgeAgo order={order} />
                      )}
                    </div>
                  </td>
                </tr>
              </OrderTbody>
            ))
          )}
        </Table>
      </OrdersContainer>

      {pagination && (
        <WrapperPagination>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            handleChangePage={handleChangePage}
            defaultPageSize={pagination.pageSize}
            handleChangePageSize={handleChangePageSize}
          />
        </WrapperPagination>
      )}
    </>
  )
}

const TimgeAgo = (props) => {
  const {
    order
  } = props
  const [{ getTimeAgo }] = useUtils()

  const [diffTime, setDiffTime] = useState(
    order?.delivery_datetime_utc
      ? getTimeAgo(order?.delivery_datetime_utc)
      : getTimeAgo(order?.delivery_datetime, { utc: false })
  )

  useEffect(() => {
    const deActive = order?.status === 1 || order?.status === 11 || order?.status === 2 || order?.status === 5 || order?.status === 6 || order?.status === 10 || order.status === 12
    if (deActive) return
    const timer = setInterval(() => {
      const diff = order?.delivery_datetime_utc
        ? getTimeAgo(order?.delivery_datetime_utc)
        : getTimeAgo(order?.delivery_datetime, { utc: false })
      setDiffTime(diff)
    }, 60 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <p>
      {diffTime}
    </p>
  )
}
