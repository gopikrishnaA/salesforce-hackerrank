import store from '../store'
import { showLoader, hideLoader } from '../reducers/loading'

const invokeService = ({ serviceUrl, method = 'GET', requestData }) => {
  console.info('serviceName is ', serviceUrl)
  console.info('requestData is ', requestData)

  const data = requestData ? JSON.stringify(requestData) : {}

  // Show loading icon
  store.dispatch(showLoader())

  // sent body object based on method
  const body = method !== 'GET' && method !== 'DELETE' ? { body: data } : {}

  // sent headers based on serviceUrl
  const baseUrl = 'https://salesforce-blogs.herokuapp.com/blogs'
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  return fetch(
    baseUrl + serviceUrl, // eslint-disable-line
    {
      method,
      headers,
      ...body,
    }
  )
    .then((response) => {
      store.dispatch(hideLoader())
      console.info('response :::: ', response)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .catch((error) => {
      store.dispatch(hideLoader())
      console.info('fetch error ::: ', error)
    })
}
export default invokeService
