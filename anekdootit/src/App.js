import React, { useState } from 'react'

const Button = (props) => {
  return(
    <div>
      <button onClick={props.handleClick}>{props.buttonName}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const nextan = () => {
    let jtn = rand()
    if(jtn == selected){
      setSelected((jtn+1)%anecdotes.length)
      jtn = (jtn+1)%anecdotes.length
    }else{
      setSelected(jtn)
    }
    console.log(jtn)
  }

  const vote = (i) => {
    const copy = {...points}
    copy[i] += 1
    setPoints(copy)
    console.log("voted", i)
  }

  const rand = () => {
    return(
      Math.floor(Math.random() * anecdotes.length)
    )
  }

  return (
    <div>
      {anecdotes[selected]}
      <li>has {points[selected]} votes </li>
      <Button handleClick={() => nextan()} buttonName="next" />
      <Button handleClick={() => vote(selected)} buttonName="vote" />
    </div>
  )
}

export default App