import React from "react"

const Filter = (props) => {
    return (
        <form>
            filter shown with <input value={props.newSearch} onChange={props.handleSearchChange} />
        </form>
    )
}

export default Filter