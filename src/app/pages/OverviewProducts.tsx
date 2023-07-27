import React, { useEffect, useState } from "react";

type dataType = {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
};

const OverviewProducts = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [filteredData, setFilteredData] = useState<dataType[]>([]);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products").then((res) =>
      res.json()
    );
    //.then((response) => setData(response.products))
    setData(response.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //console.log(data);

  useEffect(() => {
    // Aktualizácia filtrovaných dát pri zmene pôvodných dát
    const filteredData = data.filter((item) => {
      const nameMatch = item.title
        .toLowerCase()
        .includes(filterTitle.toLowerCase());
      const brandMatch = item.brand
        .toLowerCase()
        .includes(filterBrand.toLowerCase());
      const categoryMatch = item.category
        .toLowerCase()
        .includes(filterCategory.toLowerCase());
      const priceMatch = item.price.toString().includes(filterPrice);

      return nameMatch && categoryMatch && priceMatch && brandMatch;
    });

    setFilteredData(filteredData);
  }, [data, filterTitle, filterBrand, filterCategory, filterPrice]);

  const handleClearFilterTitle = () => {
    setFilterTitle("");
  };
  const handleClearFilterBrand = () => {
    setFilterBrand("");
  };
  const handleClearFilterCategory = () => {
    setFilterCategory("");
  };
  const handleClearFilterPrice = () => {
    setFilterPrice("");
  };

  const handleClearAllFilter = () => {
    setFilterTitle("");
    setFilterBrand("");
    setFilterCategory("");
    setFilterPrice("");
    setFilteredData(data);
  };

  return (
    <div>
      <h1>Overview products</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          margin: "0 50px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <button onClick={handleClearFilterTitle}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by brand"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          />
          <button onClick={handleClearFilterBrand}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <button onClick={handleClearFilterCategory}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
          <button onClick={handleClearFilterPrice}>clear</button>
        </div>

        {/* <button onClick={handleFilter}>Filter</button> */}
        <button style={{ margin: "10px 0" }} onClick={handleClearAllFilter}>
          Clear All
        </button>
      </div>
      <table
        style={{
          width: "95%",
          borderCollapse: "collapse",
          margin: "25px auto",
        }}
      >
        <thead>
          <tr>
            <th className="tableHeaderStyle">Id</th>
            <th className="tableHeaderStyle">Title</th>
            <th className="tableHeaderStyle">Brand</th>
            <th className="tableHeaderStyle">Category</th>
            <th className="tableHeaderStyle">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="tableCellStyle">{item.id}</td>
              <td className="tableCellStyle">{item.title}</td>
              <td className="tableCellStyle">{item.brand}</td>
              <td className="tableCellStyle">{item.category}</td>
              <td className="tableCellStyle">€ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewProducts;
