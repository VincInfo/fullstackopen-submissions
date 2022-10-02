import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'show'

  const handleLike = (event) => {
    event.preventDefault()
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(updatedBlog)
    setCurrentBlog(updatedBlog)
  }

  const handleDelete = (event) => {
    console.log(blog.id)
    deleteBlog(blog)
  }
  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br></br>
        {currentBlog.likes} <button onClick={handleLike}>like</button><br></br>
        {/* {blog.user.username} <br></br> */}
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog