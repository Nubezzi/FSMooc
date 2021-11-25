import React, { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.handleClick}>{props.buttonName}</button>
    </div>
  )
}

const Stat = (props) => {
  return(
    <div>
    <p>{props.name} {props.amount} {props.other}</p>
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (name, operation) => {
    //console.log("incremented: ", name)
    operation(name + 1)
  }

  return (
    <div>
      <Header name="give feedback" />
      <Button handleClick={() => increment(good, setGood)} buttonName="good" />
      <Button handleClick={() => increment(neutral, setNeutral)} buttonName="neutral" />
      <Button handleClick={() => increment(bad, setBad)} buttonName="bad" />
      <Header name="stats" />
      <Stat name="good" amount={good} />
      <Stat name="neutral" amount={neutral} />
      <Stat name="bad" amount={bad} />
      <Stat name="all" amount={bad+ good + neutral} />
      <Stat name="average" amount={(good+(bad*(-1)))/(good+bad+neutral)} />
      <Stat name="positive" amount={(good/(bad+good+neutral))*100} other="%"/>
    </div>
  )
}

export default App