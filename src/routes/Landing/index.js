/**
 * Crated by A. Gopi krishna
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import CustomModal from '../../components/Modals/Modal'
import { fetchBlogsData, updateBlogAction, deleteBlogAction } from '../../actions'
import './App.css'

class Pure extends Component {

  constructor() {
    super()
    this.state = {
      isShow: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleTitleOnChange = this.handleTitleOnChange.bind(this)
    this.handleTextOnChange = this.handleTextOnChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchBlogs()
  }

  handleTitleOnChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleTextOnChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClose = () => {
    this.setState({
      isShow: false,
      text: '',
      title: '',
      id: ''
    })
  }

  handleOpen = (item) => {
    this.setState({
      isShow: true,
      text: item.text,
      title: item.title,
      id: item.id
    })
  }
  render() {
    const { blogs, updateBlog, deleteBlog } = this.props
    const { isShow, text, title, id } = this.state
    return (
      <div className='app'>
        <CustomModal
          show={isShow}
          handleClose={this.handleClose}
          updateBlog={updateBlog}
          updatedText={text}
          updatedTitle={title}
          handleTitleOnChange={this.handleTitleOnChange}
          handleTextOnChange={this.handleTextOnChange}
          id={id}
        />
        <header className='app-header'>
          <h1>My blog</h1>
          <Button variant="danger" size='sm' onClick={() => deleteBlog()}>Delete All</Button>
        </header>
        <div className='app-container'>
          <div className='app-left-container'>
            <div className='app-title-left'>
              <h5>PAST POSTS</h5>
            </div>
            {blogs.map(item => <div key={item.id}>{item.timestamp} - POST {item.id}</div>)}
            <Nav.Link onClick={this.handleOpen}>Create New Posts</Nav.Link>
          </div>
          <div className='app-right-container'>
            {blogs.map((item) => <div key={item.id}>
              <div className='app-title'>
                <div className='app-left-title'>{item.title}</div>
                <div className='app-right-title'><i>{item.timestamp}</i></div>
              </div>
              <div>{item.text}</div>
              <div className='app-buttons'>
                <Button className='app-button' size='sm' onClick={() => this.handleOpen(item)}>Edit</Button>
                <Button variant="danger" size='sm' onClick={() => deleteBlog(item.id)}>Delete</Button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    )
  }
}

const state = ({ blogs }) => ({
  blogs: blogs.items
})

const dispatch = (dispatch) => ({
  fetchBlogs: () => dispatch(fetchBlogsData()),
  updateBlog: (payload) => dispatch(updateBlogAction(payload)),
  deleteBlog: (payload) => dispatch(deleteBlogAction(payload)),
})

Pure.propTypes = {
  blogs: PropTypes.array,
  deleteBlog: PropTypes.func,
  fetchBlogs: PropTypes.func,
  updateBlog: PropTypes.func
}

export const LandingPage = connect(state, dispatch)(Pure)
