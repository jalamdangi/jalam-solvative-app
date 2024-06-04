import React from 'react';

function LimitInput({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className="limit-input">
      <label htmlFor="limit">Limit:</label>
      <input
        type="number"
        id="limit"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default LimitInput;
