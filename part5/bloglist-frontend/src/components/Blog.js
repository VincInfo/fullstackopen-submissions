import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'show'

  const handleLike = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(blog))
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1,
    })
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    console.log(blog.id)
    deleteBlog(blog)
  }

  return (
    <div className="blog">
      <div className="blogTitle">
        {blog.title} - {blog.author} <button id='show-button' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        {blog.url} <br></br>
        {blog.likes} <button onClick={handleLike}>like</button><br></br>
        {/* {user.name} <br></br> */}
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

Blog.propType = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog