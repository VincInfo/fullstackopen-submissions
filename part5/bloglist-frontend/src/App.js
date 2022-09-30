import loginService from './services/login'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification])

  useEffect(() => {
    getAllBlogs()
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('error: ' + exception.response.data.error)
    }
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(BlogToAdd)
      setBlogs(blogs.concat(createdBlog))
      setNotification(`Blog ${BlogToAdd.title} successfully added`)
    } catch (exception) {
      setNotification(
        'error' + exception.response.data.error
      )
    }
  }

  const handelLogOut = (event) => {
    event.preventDefault()
    if (window.confirm('Do You really want to log out ?')) {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>
            <strong>{user.name}</strong>  logged-in
            <button onClick={handelLogOut}>log out</button>
          </p>
          <Toggable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </Toggable>
        </div>
      )
      }
    </div>
  )
}


export default App
