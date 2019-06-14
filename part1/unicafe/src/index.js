import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

// eslint-disable-next-line jsx-a11y/heading-has-content
const Title = ({ ...props }) => <h2 {...props} />;

const Button = ({ title, onClick }) => (
  <button onClick={onClick}>{title}</button>
);

const Statistic = ({ title, value }) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
);

const NoStats = () => <div>No feedback given</div>;

const SCORES = {
  good: 1,
  neutral: 0,
  bad: -1
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average =
    (SCORES.good * good + SCORES.neutral * neutral + SCORES.bad * bad) / all;
  const positivePercentage = (good * 100) / all;
  return (
    <>
      <Statistic title="all" value={all} />
      <Statistic title="average" value={average || 0} />
      <Statistic title="positive" value={`${positivePercentage || 0} %`} />
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
      <Title>give feedback</Title>
      <Button title="good" onClick={() => setGood(good + 1)} />
      <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" onClick={() => setBad(bad + 1)} />
      <Title>statistics</Title>
      {good || neutral || bad ? (
        <table>
          <tbody>
            <Statistic title="good" value={good} />
            <Statistic title="neutral" value={neutral} />
            <Statistic title="bad" value={bad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
          </tbody>
        </table>
      ) : (
        <NoStats />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
