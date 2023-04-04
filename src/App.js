import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const Feedback = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={good} text="good" />
      <Button handleClick={neutral} text="neutral" />
      <Button handleClick={bad} text="bad" />
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = 1 - ((bad + neutral*0.5) / total)
  const positive = (good / total) * 100
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + "%"} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Feedback good={handleGoodClick} neutral={handleNeutralClick} bad={handleBadClick} />
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
       ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  )

}

export default App;