import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Anecdote = ({ text, votes }) => (
  <>
    <div>{text}</div>
    <div>has {votes} votes</div>
  </>
);

const NoVotesYet = () => <div>No votes were casted yet.</div>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  let maxVotesIndex = indexOfMax(votes);

  const handleClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {votes[maxVotesIndex] ? (
        <Anecdote
          text={anecdotes[maxVotesIndex]}
          votes={votes[maxVotesIndex]}
        />
      ) : (
        <NoVotesYet />
      )}
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

function indexOfMax(array) {
  let maxIndex = 0;
  let max = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index] > max) {
      max = array[index];
      maxIndex = index;
    }
  }
  return maxIndex;
}
