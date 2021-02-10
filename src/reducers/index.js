import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loading from './loading'
import blogs from './blogs'

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    loading,
    blogs,
  })

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
