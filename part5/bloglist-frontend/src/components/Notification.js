import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  if (notification.includes('error')) {
    return (
      <div className="error notification" id="error" style={{ color: 'red', borderColor: 'red' }}>
        {notification}
      </div>
    )
  }

  return (
    <div className="success notification" id="success" style={{ color: 'green', borderColor: 'green' }}>
      {notification}
    </div>
  )

}

export default Notification