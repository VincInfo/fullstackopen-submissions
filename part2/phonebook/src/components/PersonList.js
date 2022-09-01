import React from "react"

const PersonList = (props) => {
    const copy = props.value.filter(e => e.name.includes(props.newSearch))
    return (
        <ul>
            {copy.map(e =>
                <li className="note" key={e.name} number={e.number} name={e.name}>
                    {e.name}: {e.number}
                    <button key={e.name} onClick={props.handleDelete} name={e.name} id={e.id}>delete</button>
                </li>)}
        </ul>
    )
}

export default PersonList