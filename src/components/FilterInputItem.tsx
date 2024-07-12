import React from "react";

import "./../../styles/globalStyle.scss";

type FilterInputItemProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  //inputType: "text" | "dropdown";
  //dropdownOptions?: string[];
};

const FilterInputItem: React.FC<FilterInputItemProps> = ({
  placeholder,
  value,
  onChange,
  onClear,
  //inputType,
  //dropdownOptions,
}) => {
  return (
    <div
      className="filterItem"
      style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={() => onClear()}>X</button>
    </div>
  );
  //   if (inputType === "dropdown" && dropdownOptions) {
  //     return (
  //       <div
  //         className="filterItem"
  //         style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
  //       >
  //         <select value={value} onChange={(e) => onChange(e.target.value)}>
  //           {dropdownOptions.map((option) => (
  //             <option key={option} value={option}>
  //               {option}
  //             </option>
  //           ))}
  //         </select>
  //         <button onClick={() => onClear()}>X</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div
  //         className="filterItem"
  //         style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
  //       >
  //         <input
  //           type="text"
  //           placeholder={placeholder}
  //           value={value}
  //           onChange={(e) => onChange(e.target.value)}
  //         />
  //         <button onClick={() => onClear()}>X</button>
  //       </div>
  //     );
  //   }
};

export default FilterInputItem;
