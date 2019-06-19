import * as React from 'react';

const Filter = ({ value, onChange }) => {
  const handleChange = event => onChange(event.target.value);
  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Filter;
