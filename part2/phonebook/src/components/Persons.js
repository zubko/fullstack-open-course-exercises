import * as React from "react";

const Person = ({ name, number }) => (
  <div>
    {name}: {number}
  </div>
);

export default ({ list }) =>
  list.map(p => <Person key={p.name} name={p.name} number={p.number} />);
