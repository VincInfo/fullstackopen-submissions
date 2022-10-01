import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog, updateBlog}) => {
  const [visible, setVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const showWhenVisible = { display: visible ? '' : 'none'}

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
    setCurrentBlog(updateBlog)
  }

  return (
    <div>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br></br>
        {blog.likes} <button onClick={handleLike}>like</button><br></br>
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog