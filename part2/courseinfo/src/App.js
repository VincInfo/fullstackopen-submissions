import logo from './logo.svg';
import './App.css';

const Header = (props) => {
  return (
    <div>
      <h1>{props.content}</h1>
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
      <div>
        <p></p>
        <Part content={props.content[0]} />
        <Part content={props.content[1]} />
        <Part content={props.content[2]} />
      </div>
    </div>
  )
}

const Total = (props) => {
  const exercises = props.content.map(e => e.exercises)
  const initValue = 0; 
  const sumOfExercises = exercises.reduce((previousValue, currentValue) => previousValue + currentValue, initValue)
  return (
    <div>
      <p> <strong>total of {sumOfExercises} exercises</strong></p>
    </div>
  )
}

const Course = (props) => {
  // console.log('hi');
  return (
    <div>
      <Header content={props.course.name} />
      <Content content={props.course.parts} />
      <Total content={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
