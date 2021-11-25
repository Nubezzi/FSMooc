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

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        <p>No feedback given yet</p>
      </div>
    )
  }
  return(
    <div>
      <Stat name="good" amount={props.good} />
      <Stat name="neutral" amount={props.neutral} />
      <Stat name="bad" amount={props.bad} />
      <Stat name="all" amount={props.bad+ props.good + props.neutral} />
      <Stat name="average" amount={(props.good+(props.bad*(-1)))/(props.good+props.bad+props.neutral)} />
      <Stat name="positive" amount={(props.good/(props.bad+props.good+props.neutral))*100} other="%"/>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App