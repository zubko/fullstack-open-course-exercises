import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(p => (
      <Part key={p.name} name={p.name} exercises={p.exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <p style={{ fontWeight: "bold" }}>
    Total of {parts.reduce((prev, current) => prev + current.exercises, 0)}{" "}
    exercises
  </p>
);

export default ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);
