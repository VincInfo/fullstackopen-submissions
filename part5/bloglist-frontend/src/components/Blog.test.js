import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'



describe('Blog test', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 123
  }

  test('renders right content', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(`${blog.title} - ${blog.author}`)
    expect(component.queryByText(blog.url)).not.toBeInTheDocument()
    expect(component.queryByText(blog.likes)).not.toBeInTheDocument()
  })

  test('shows details when button is clicked', () => {
    const component = render(<Blog blog={blog} />)

    const button = screen.getByText('show')
    fireEvent.click(button)


    const blogDetail = component.container.querySelector('.blogDetails')
    expect(blogDetail).toBeVisible()
    expect(blogDetail).toHaveTextContent(blog.url)
    expect(blogDetail).toHaveTextContent(blog.likes)
  })

  test('calling like handler works', () => {
    const likeMockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={likeMockHandler} />)

    const showButton = screen.getByText('show')
    fireEvent.click(showButton)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})




