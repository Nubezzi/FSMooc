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

/*const StatisticsLine = (props) => {
  return(
    <body>
      <td>{props.name}</td>
      <td>{props.amount} {props.other}</td>
    </body>
  )
}*/

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
      <table>
        <tbody>
          <tr>
            <th>type</th>
            <th>grade</th>
          </tr>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.bad+ props.good + props.neutral}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(props.good+(props.bad*(-1)))/(props.good+props.bad+props.neutral)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(props.good/(props.bad+props.good+props.neutral))*100} %</td>
          </tr>
        </tbody>
      </table>
    </div>

    /*
    <div>
      <StatisticsLine name="good" amount={props.good} />
      <StatisticsLine name="neutral" amount={props.neutral} />
      <StatisticsLine name="bad" amount={props.bad} />
      <StatisticsLine name="all" amount={props.bad+ props.good + props.neutral} />
      <StatisticsLine name="average" amount={(props.good+(props.bad*(-1)))/(props.good+props.bad+props.neutral)} />
      <StatisticsLine name="positive" amount={(props.good/(props.bad+props.good+props.neutral))*100} other="%"/>
    </div>
    */
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