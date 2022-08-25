const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course} {props.exercises1}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0]}/>
      <Part part={props.content[1]}/>
      <Part part={props.content[2]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const spoon = {
    course: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // console.log(part1.exercises)
  return (
    <div>
      <Header course={spoon.course} />
      <Content content={spoon.parts}/>
      <Total content={spoon.parts}/>
    </div>
  )
}

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} exercises1={exercises1} />
//       <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2}
//         exercises3={exercises3}/>
//       <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
//     </div>
//   )
// }

export default App

