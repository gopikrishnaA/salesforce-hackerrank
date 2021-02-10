/**
 * Crated by A. Gopi krishna
 */
import React from 'react'
import Proptypes from 'prop-types'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'

const CustomModal = (props) => {
  const {
    id = 0,
    updatedTitle = '',
    updatedText = '',
    handleClose = () => { },
    updateBlog = () => { },
    show,
    handleTitleOnChange = () => { },
    handleTextOnChange = () => { }
  } = props;

  const handleSave = () => {
    updateBlog({ id, text: updatedText, title: updatedTitle })
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{id ? 'EDIT POST' : 'NEW POST'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <FormControl
              id='title'
              required
              placeholder='Title'
              onChange={handleTitleOnChange}
              value={updatedTitle}
              isValid={updatedTitle.trim().length > 2}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <FormControl
              id='text'
              required
              as='textarea'
              placeholder='Text'
              onChange={handleTextOnChange}
              value={updatedText}
              rows={10}
              isValid={updatedText.trim().length > 2}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={updatedTitle.trim().length < 3 || updatedText.trim().length < 3}
            variant='primary'
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

CustomModal.propTypes = {
  id: Proptypes.any,
  updatedTitle: Proptypes.string,
  updatedText: Proptypes.string,
  handleClose: Proptypes.func,
  handleSave: Proptypes.func,
  updateBlog: Proptypes.func,
  handleTitleOnChange: Proptypes.func,
  handleTextOnChange: Proptypes.func,
  show: Proptypes.bool
}

export default CustomModal
