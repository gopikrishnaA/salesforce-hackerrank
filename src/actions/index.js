/**
 * Crated by A. Gopi krishna
 */
import { createAction } from 'redux-act'

// Redux logic actions

// fetch the blogs data
export const DATA_FETCH = 'DATA_FETCH'
export const DATA_FETCH_CANCEL = 'DATA_FETCH_CANCEL'
export const fetchBlogsData = createAction(DATA_FETCH)
export const onSucessAction = createAction('GET_BLOGS')

// update blog
export const UPDATE_BLOG = 'UPDATE_BLOG'
export const updateBlogAction = createAction(UPDATE_BLOG)

// delete blog
export const DELETE_BLOG = 'DELETE_BLOG'
export const deleteBlogAction = createAction(DELETE_BLOG)

