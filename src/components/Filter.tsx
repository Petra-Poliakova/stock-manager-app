import React, { ChangeEvent } from "react";

type FilterProps = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const Filter = ({ placeholder, value, onChange, onClear }: FilterProps) => {
  return (
    <div
      className="filterItem"
      style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onClear}>X</button>
    </div>
  );
};

export default Filter;
