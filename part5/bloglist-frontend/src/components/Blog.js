import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

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
    // console.log('aus handle like: ' + blog.user.username)
    updateBlog(blog.id, updatedBlog)
    // setCurrentBlog(updatedBlog)
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
        {blog.likes} <button onClick={handleLike}>like</button><br></br>
        {user.name} <br></br>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog