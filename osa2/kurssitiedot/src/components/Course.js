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
      <h2>{props.course.name}</h2>
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

  export default Course