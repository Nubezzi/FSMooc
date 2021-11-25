import React from 'react'

const Header = (props) => {
  console.log(props)
  return(
    <div>
    <h1>{props.course.name}</h1>
  </div>
  )
}
const Content = (props) => {
  return(
    <div>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  //console.log(props)
  return(
    <div>
    <p>{props.part.name} {props.part.exercises}</p> 
  </div>
  )
}

const Total = (props) => {
  //console.log(props)
  return(
    <div>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
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

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

  /*return (
    <div>
      <Header course={course} />
      <Content desc1={part1.name} exercises1={part1.exercises}
      desc2={part2.name} exercises2={part2.exercises}
      desc3={part3.name} exercises3={part3.exercises}
      />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )*/
}

export default App