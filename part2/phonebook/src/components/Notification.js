const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    if (message.includes("success")) {
        return (
            <div className='confirmMessage' style={{ color: 'green', borderColor: 'green' }}>
                {message}
            </div>
        )
    } else {
        return (
            <div className='confirmMessage' style={{ color: 'red', borderColor: 'red' }}>
                {message}
            </div>
        )
    }
}

export default Notification