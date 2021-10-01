import React from 'react'
import FaCcMastercard from '@meronex/icons/fa/FaCcMastercard'
import FaCcVisa from '@meronex/icons/fa/FaCcVisa'
import FaCreditCard from '@meronex/icons/fa/FaCreditCard'
import moment from 'moment'

export const optimizeImage = (url, params, fallback) => {
  if (!url && fallback) return fallback
  params = params && params.length > 0 ? `,${params}` : ''
  if (url != null && url.indexOf('res.cloudinary.com') !== -1) {
    var parts = url.split('upload')
    url = `${parts[0]}upload/f_auto,q_auto${params}${parts[1]}`
  }
  return url
}

export const getIconCard = (brand = '') => {
  const value = brand.toLowerCase()
  switch (value) {
    case 'visa':
      return <FaCcVisa />
    case 'mastercard':
      return <FaCcMastercard />
    default:
      return <FaCreditCard />
  }
}

/**
 * Function to convert a string in string capitalized
 * @param {string} str string to capitalize
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const DriverTipsOptions = [0, 10, 15, 20, 25]

/**
 * Function to calculate time to scroll element
 * @param {*} t = current time
 * @param {*} b = start value
 * @param {*} c = change in value
 * @param {*} d = duration
 */
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/**
 * Function to do scroll of one element to another
 * @param {*} element = parent element
 * @param {*} to = position Top of child element
 * @param {*} duration = time to animation
 */
export const scrollTo = (element, to, duration) => {
  const start = element.scrollTop
  const change = to - start
  let currentTime = 0
  const increment = 20

  const animateScroll = () => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration && val > 0) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

/**
 * Function to get formatted link to include in iframes
 * @param {string} url = youtube - vimeo link video
 */
export const formatUrlVideo = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  const id = (match && match[7].length === 11) ? match[7] : false
  return `https://www.youtube-nocookie.com/embed/${id}`
}

/**
 * Function to convert delivery time in minutes
 * @param {string} time business delivery time
 */
export const convertHoursToMinutes = (time) => {
  if (!time) return '0min'
  const [hour, minute] = time.split(':')
  const result = (parseInt(hour, 10) * 60) + parseInt(minute, 10)
  return `${result}min`
}

/**
 * Function to convert star rate in width to display
 * @param {int} qualification star rate or qualification
 */
export const getStarWidth = (qualification) => {
  if (qualification) {
    return qualification / 5 * 100 + '%'
  } else {
    return '0%'
  }
}

/**
 * Function to calculate differnece with current time in minutes
 * @param {string} time past time
 */
export const getAgoMinutes = (time) => {
  const totalMinutes = ((moment().utc() - moment(time)) / 1000 / 60).toFixed(0)
  const totalHours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes - totalHours * 60
  const days = Math.floor(totalHours / 24)
  const hours = totalHours - days * 24
  if (days > 0) {
    return `-${days} days ${hours}:${minutes} hrs`
  } else if (hours > 0) {
    return `-${hours}:${minutes} hrs`
  } else return `-00:${minutes} hrs`
}

/**
 * Function to transform bytes to kb
 * @param {number} bytes for transform
 *
 */
export const bytesConverter = bytes => {
  return Math.floor(bytes / 1024)
}

/**
 * List of fields with correct order
 */
export const fieldsToSort = ['name', 'middle_name', 'lastname', 'second_lastname', 'email']

/**
  * Function to return a array sorted by certain fields
  * @param fields Array with right order
  * @param array Array to sort
  */
export const sortInputFields = ({ fields, values }) => {
  let fieldsBase = fields
  const fieldsSorted = []
  const fieldsArray = Array.isArray(values) ? values : Object.values(values)

  if (!fieldsBase) {
    fieldsBase = fieldsToSort
  }

  fieldsBase.forEach(f => {
    fieldsArray.forEach(field => {
      if (f === field.code) {
        fieldsSorted.push(field)
      }
    })
  })
  return fieldsSorted
}

/**
 * Function to covert seconds into remain hours
 * @param {Number} seconds
 */
export const getHours = (seconds) => {
  return (seconds * 1) / 3600 > 1 ? Math.floor((seconds * 1) / 3600) : 0
}

/**
 * Function to covert seconds into remain Minutes
 * @param {Number} seconds
 */
export const getMinutes = (seconds) => {
  return Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60)
}

/**
 * Function to covert seconds into remain Seconds
 * @param {Number} seconds
 */
export const getSeconds = (seconds) => {
  const remain = seconds - Math.floor(seconds / 3600) * 3600
  return Math.floor(remain - Math.floor(remain / 60) * 60)
}

/**
 * Function to check if a number is decimal or not
 * @param {*} value number to check if decimal or not
 * @param {*} parser function fallback when is decimal
 * @returns string
 */
export const verifyDecimals = (value, parser) => {
  if (value % 1 === 0) {
    return value
  } else {
    return parser(value)
  }
}
