import React from 'react'

const Course = (props) => {
  return(
    <div>
    <Header course={props.course}/>
    <Content course={props.course.parts}/>
    <Total course={props.course.parts}/>
  </div>
  )
}

const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.course.name}</h1>
  )
}
const Content = (props) => {
  console.log(props)
  return(
    <div>
    {props.course.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
    <p>{props.part.name} {props.part.exercises}</p> 
  </div>
  )
}

const Total = (props) => {
  const sum = props.course.reduce( (acc, cur) => acc + cur.exercises, 0) 
  return (
    <p>Total exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App