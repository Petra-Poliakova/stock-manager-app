import React, { ChangeEvent } from "react";

type FilterProps = {
  placeholder?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const Filter = (({ placeholder = "Enter text", value = "", onChange, onClear }: FilterProps) => {
  return (
    <div className="filterItem">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Filter input"
        className="filterInput"
      />
      <button onClick={onClear} aria-label="Clear filter" className="clearButton">X</button>
    </div>
  );
});

export default Filter;
