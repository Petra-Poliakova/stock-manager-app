import React from 'react'

import './Filter.scss'

type FilterProps ={
    filterTitle: string;
    filterBrand: string;
    filterCategory: string;
    filterPrice: string;
    onFilterTitleChange: (value: string) => void;
    onFilterBrandChange: (value: string) => void;
    onFilterCategoryChange: (value: string) => void;
    onFilterPriceChange: (value: string) => void;
    onClearAllFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  filterTitle,
  filterBrand,
  filterCategory,
  filterPrice,
  onFilterTitleChange,
  onFilterBrandChange,
  onFilterCategoryChange,
  onFilterPriceChange,
  onClearAllFilters,
}) => {
  return (
    <div>
         <div className="filterItem" style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterTitle}
          onChange={(e) => onFilterTitleChange(e.target.value)}
        />
        <button onClick={() => onFilterTitleChange("")}>X</button>
      </div>
      <div className="filterItem" style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Filter by brand"
          value={filterBrand}
          onChange={(e) => onFilterBrandChange(e.target.value)}
        />
        <button onClick={() => onFilterBrandChange("")}>X</button>
      </div>
      <div className="filterItem" style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
        />
        <button onClick={() => onFilterCategoryChange("")}>X</button>
      </div>
      <div className="filterItem" style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Filter by price"
          value={filterPrice}
          onChange={(e) => onFilterPriceChange(e.target.value)}
        />
        <button onClick={() => onFilterPriceChange("")}>X</button>
      </div>

      <button style={{ margin: "10px 0" }} onClick={onClearAllFilters}>
        Clear All
      </button>
    </div>
  )
}

export default Filter
