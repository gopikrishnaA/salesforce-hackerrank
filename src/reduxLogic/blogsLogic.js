/**
 * Crated by A. Gopi krishna
 */
import { createLogic } from 'redux-logic'
import * as Actions from '../actions'
import invokeService from '../services'

// Get all blogs action
const fetchLogic = createLogic({
  type: Actions.DATA_FETCH, // only apply this logic to this type
  cancelType: Actions.DATA_FETCH_CANCEL, // cancel on this type
  latest: true, // only take latest
  process({ }, dispatch, done) {
    invokeService({
      serviceUrl: '/api/',
    })
      .then((result) => {
        const sortDates = result.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }).map(item => {
          item.timestamp = new Date(item.timestamp).toDateString();
          return item;
        });

        dispatch(Actions.onSucessAction({ items: sortDates }))
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  },
})

// Edit or New action for specific blog creation
const updateBlogs = createLogic({
  type: Actions.UPDATE_BLOG, // only apply this logic to this type
  process({ action }, dispatch, done) {
    const requestData = {
      title: action.payload.title,
      text: action.payload.text,
    }
    invokeService({
      serviceUrl: action.payload.id ? `/api/${action.payload.id}`: '/api/',
      method: 'POST',
      requestData,
    })
      .then(() => {
        dispatch(Actions.fetchBlogsData())
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  },
})

// Delete action for all and specific id
const deleteBlog = createLogic({
  type: Actions.DELETE_BLOG, // only apply this logic to this type
  process({ action }, dispatch, done) {
    invokeService({
      serviceUrl: action.payload ? `/api/${action.payload}`: '/api/',
      method: 'DELETE'
    })
      .then(() => {
        dispatch(Actions.fetchBlogsData())
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  },
})

export default [
  fetchLogic,
  updateBlogs,
  deleteBlog
]
