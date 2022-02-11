import React, { useState, useEffect } from 'react'
import { useLanguage } from 'ordering-components-admin'
import { Select } from '../../../styles/Select'
import { Select as FirstSelect } from '../../../styles/Select/FirstSelect'
import { useTheme } from 'styled-components'
import { MultiSelect } from '../../../styles/MultiSelect'
import { Option, PlaceholderTitle, OrderStatusTypeSelectWrapper } from './styles'

export const OrderStatusTypeSelector = (props) => {
  const {
    isFirstSelect,
    defaultValue,
    deliveryType,
    mutiOrdersChange,
    orderId,
    type,
    orderControl,
    noPadding,
    noSelected,
    isFilterView,
    filterValues,
    handleUpdateOrderStatus,
    handleChangeMultiOrdersStatus,
    handleChangeOrderStatus
  } = props

  const [, t] = useLanguage()
  const theme = useTheme()
  const [defaultOptionValue, setDefaultOptionValue] = useState('default')
  const [filteredOrderStatuses, setFilteredOrderStatuses] = useState([])

  const placeholder = <PlaceholderTitle>{t('SELECT_STATUS', 'Select Status')}</PlaceholderTitle>

  const orderStatuses = [
    {
      value: 'default',
      name: t('CHANGE_STATUS', 'Change Status'),
      content: <Option noPadding={noPadding}><p>{t('CHANGE_STATUS', 'Change Status')}</p></Option>,
      disabled: true
    },
    {
      value: 'pending',
      name: t('PENDING', 'Pending'),
      content: (
        <Option noPadding={noPadding}>
          <img src={theme?.images?.orderStatus?.pending} alt='pending' />
          <p>{t('PENDING', 'Pending')}</p>
        </Option>
      ),
      disabled: true
    },
    {
      value: 0,
      name: t('PENDING', 'Pending'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('PENDING', 'Pending')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 13,
      name: t('PREORDER', 'Preorder'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('PREORDER', 'Preorder')}</p>
        </Option>
      ),
      color: 'primary',
      disabled: true
    },
    {
      value: 'inProgress',
      name: t('IN_PROGRESS', 'In Progress'),
      content: (
        <Option noPadding={noPadding}>
          <img src={theme?.images?.orderStatus?.inProgress} alt='progress' />
          <p>{t('IN_PROGRESS', 'In Progress')}</p>
        </Option>
      ),
      disabled: true
    },
    {
      value: 7,
      name: t('ACCEPTED_BY_BUSINESS', 'Accepted by Business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ACCEPTED_BY_BUSINESS', 'Accepted by Business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 4,
      name: t('PREPARATION_COMPLETED', 'Preparation Completed'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('PREPARATION_COMPLETED', 'Preparation Completed')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 8,
      name: t('ACCEPTED_BY_DRIVER', 'Accepted by Driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ACCEPTED_BY_DRIVER', 'Accepted by Driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 3,
      name: t('ORDER_STATUS_IN_BUSINESS', 'Driver arrived to business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_STATUS_IN_BUSINESS', 'Driver arrived to business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 9,
      name: t('PICK_UP_COMPLETED_BY_DRIVER', 'Pick up completed by driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('PICK_UP_COMPLETED_BY_DRIVER', 'Pick up completed by driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 14,
      name: t('ORDER_NOT_READY', 'Order not ready'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_NOT_READY', 'Order not ready')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 18,
      name: t('ORDER_DRIVER_ALMOST_ARRIVED_BUSINESS', 'Driver almost arrived to business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_DRIVER_ALMOST_ARRIVED_BUSINESS', 'Driver almost arrived to business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 19,
      name: t('ORDER_DRIVER_ALMOST_ARRIVED_CUSTOMER', 'Driver almost arrived to customer'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_DRIVER_ALMOST_ARRIVED_CUSTOMER', 'Driver almost arrived to customer')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 20,
      name: t('ORDER_CUSTOMER_ALMOST_ARRIVED_BUSINESS', 'Customer almost arrived to business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_CUSTOMER_ALMOST_ARRIVED_BUSINESS', 'Customer almost arrived to business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 21,
      name: t('ORDER_CUSTOMER_ARRIVED_BUSINESS', 'Customer arrived to business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_CUSTOMER_ARRIVED_BUSINESS', 'Customer arrived to business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: null,
      name: t('COMPLETED', 'Completed'),
      content: (
        <Option noPadding={noPadding}>
          <img src={theme?.images?.orderStatus?.completed} alt='completed' />
          <p>{t('COMPLETED', 'Completed')}</p>
        </Option>
      ),
      disabled: true
    },
    {
      value: 1,
      name: t('COMPLETED_BY_ADMIN', 'Completed by Admin'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('COMPLETED_BY_ADMIN', 'Completed by Admin')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 11,
      name: t('DELIVERY_COMPLETED_BY_DRIVER', 'Delivery Completed by Driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('DELIVERY_COMPLETED_BY_DRIVER', 'Delivery Completed by Driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 15,
      name: t('ORDER_PICKEDUP_COMPLETED_BY_CUSTOMER', 'Pickup completed by customer'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_PICKEDUP_COMPLETED_BY_CUSTOMER', 'Pickup completed by customer')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: null,
      name: t('CANCELLED', 'Cancelled'),
      content: (
        <Option noPadding={noPadding}>
          <img src={theme?.images?.orderStatus?.cancelled} alt='cancelled' />
          <p>{t('CANCELLED', 'Cancelled')}</p>
        </Option>
      ),
      disabled: true
    },
    {
      value: 2,
      name: t('REJECTED_BY_ADMIN', 'Rejected by Admin'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('REJECTED_BY_ADMIN', 'Rejected by Admin')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 5,
      name: t('REJECTED_BY_BUSINESS', 'Rejected by Business'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('REJECTED_BY_BUSINESS', 'Rejected by Business')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 6,
      name: t('REJECTED_BY_DRIVER', 'Rejected by Driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('REJECTED_BY_DRIVER', 'Rejected by Driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 10,
      name: t('PICK_UP_FAILED_BY_DRIVER', 'Pickup Failed by Driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('PICK_UP_FAILED_BY_DRIVER', 'Pickup Failed by Driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 12,
      name: t('DELIVERY_FAILED_BY_DRIVER', 'Delivery Failed by Driver'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('DELIVERY_FAILED_BY_DRIVER', 'Delivery Failed by Driver')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 16,
      name: t('ORDER_STATUS_CANCELLED_BY_CUSTOMER', 'Cancelled by customer'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_STATUS_CANCELLED_BY_CUSTOMER', 'Cancelled by customer')}</p>
        </Option>
      ),
      color: 'primary'
    },
    {
      value: 17,
      name: t('ORDER_NOT_PICKEDUP_BY_CUSTOMER', 'Not picked by customer'),
      content: (
        <Option noPadding={noPadding}>
          <p>{t('ORDER_NOT_PICKEDUP_BY_CUSTOMER', 'Not picked by customer')}</p>
        </Option>
      ),
      color: 'primary'
    }
  ]

  const changeOrderStatus = (orderStatus) => {
    if (orderStatus !== 'default' && orderStatus !== defaultValue) {
      if (!mutiOrdersChange) {
        handleUpdateOrderStatus({ id: orderId, newStatus: orderStatus })
      } else {
        handleChangeMultiOrdersStatus(orderStatus)
      }
    }
  }

  useEffect(() => {
    if (!isFilterView) {
      if (orderControl) {
        setFilteredOrderStatuses(orderStatuses)
      } else if (deliveryType === 1) {
        let _filteredOrderStatues = []
        let extractOrderStatus = []
        extractOrderStatus = orderStatuses.slice(0, 13)
        _filteredOrderStatues = [...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(15, 18)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(19, 26)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        setFilteredOrderStatuses(_filteredOrderStatues)
      } else {
        let _filteredOrderStatues = []
        let extractOrderStatus = []
        extractOrderStatus = orderStatuses.slice(0, 7)
        _filteredOrderStatues = [...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(10, 11)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(13, 17)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(18, 22)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        extractOrderStatus = orderStatuses.slice(25, 27)
        _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

        setFilteredOrderStatuses(_filteredOrderStatues)
      }
    } else {
      let _filteredOrderStatues = []
      let extractOrderStatus = []
      extractOrderStatus = orderStatuses.slice(2, 4)
      _filteredOrderStatues = [...extractOrderStatus]

      extractOrderStatus = orderStatuses.slice(5, 15)
      _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

      extractOrderStatus = orderStatuses.slice(16, 19)
      _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

      extractOrderStatus = orderStatuses.slice(20, 27)
      _filteredOrderStatues = [..._filteredOrderStatues, ...extractOrderStatus]

      setFilteredOrderStatuses(_filteredOrderStatues)
    }
  }, [])

  useEffect(() => {
    setDefaultOptionValue(defaultValue)
  }, [defaultValue])

  const filterChangeOrderStatus = (status) => {
    handleChangeOrderStatus(status)
  }

  const [defaultFilterValues, setDefaultFilterValues] = useState([])

  useEffect(() => {
    if (isFilterView) {
      const _defaultFilterValues = [...filterValues.statuses]
      setDefaultFilterValues(_defaultFilterValues)
    }
  }, [filterValues])

  const handleChangeSearch = (searchValue) => {
    const _filteredOrderStatuses = [...orderStatuses?.filter(orderStatuse => orderStatuse?.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))]
    setFilteredOrderStatuses(_filteredOrderStatuses)
  }

  if (isFilterView) {
    return (
      <MultiSelect
        optionInnerMaxHeight='50vh'
        placeholder={placeholder}
        defaultValue={defaultFilterValues}
        options={filteredOrderStatuses}
        onChange={(orderStatus) => filterChangeOrderStatus(orderStatus)}
      />
    )
  } else {
    return (
      <OrderStatusTypeSelectWrapper>
        {isFirstSelect ? (
          <FirstSelect
            type={type}
            optionInnerMaxHeight='50vh'
            noSelected={noSelected}
            defaultValue={defaultOptionValue}
            options={filteredOrderStatuses}
            onChange={(orderStatus) => changeOrderStatus(orderStatus)}
            className='orderStatus'
            isShowSearchBar
            handleChangeSearch={handleChangeSearch}
          />
        ) : (
          <Select
            type={type}
            optionInnerMaxHeight='50vh'
            noSelected={noSelected}
            defaultValue={defaultOptionValue}
            options={filteredOrderStatuses}
            onChange={(orderStatus) => changeOrderStatus(orderStatus)}
            className='orderStatus'
          />
        )}
      </OrderStatusTypeSelectWrapper>
    )
  }
}