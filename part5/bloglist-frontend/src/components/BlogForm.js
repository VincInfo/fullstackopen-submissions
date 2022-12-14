import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id='title'
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
        author
        <input
          id='author'
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url
        <input
          id='url'
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          placeholder='url'
        />
      </div>

      <button id='add-button' type="submit">add</button>
    </form>
  )
}

BlogForm.prototype = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm