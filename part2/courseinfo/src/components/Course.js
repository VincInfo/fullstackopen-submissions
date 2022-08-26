import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h2>{props.content}</h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.content.name} {props.content.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.content.map(e =>
                <div key={e.id}>
                    <Part content={e} />
                </div>
            )}
        </div>
    )
}

const Total = (props) => {
    const sumInit = 0;
    const exercises = props.content.map(e => e.exercises)
    const sumOfExercises = exercises.reduce((a, b) => a + b, sumInit)
    return (
        <div>
            <strong>total of {sumOfExercises} exercises</strong>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            {props.content.map(e =>
                <div key={e.id}>
                    <Header content={e.name} />
                    <Content content={e.parts} />
                    <Total content={e.parts} />
                </div>
            )}
        </div>
    )
}

export default Course