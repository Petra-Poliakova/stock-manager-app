import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";

import "./../../../styles/globalStyle.scss";

type dataType = {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
};

const Products = () => {
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
  console.log(data);

  useEffect(() => {
    // Aktualizácia filtrovaných dát pri zmene pôvodných dát
    const filteredData = data.filter((item) => {
      const nameMatch = item.title?.toLowerCase().includes(filterTitle.toLowerCase()) ?? false;
      const brandMatch = item.brand?.toLowerCase().includes(filterBrand.toLowerCase()) ?? false;
      const categoryMatch = item.category?.toLowerCase().includes(filterCategory.toLowerCase()) ?? false;
      const priceMatch = item.price.toString().includes(filterPrice);

      return nameMatch && categoryMatch && priceMatch && brandMatch;
    });

    setFilteredData(filteredData);
  }, [data, filterTitle, filterBrand, filterCategory, filterPrice]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterTitle(e.target.value);
  };
  const onChangeBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterBrand(e.target.value);
  };
  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(e.target.value);
  };
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterPrice(e.target.value);
  };

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
    <div className="container" style={{ width: "95%", margin: "0 auto" }}>
      <h1>Overview</h1>
      <div
        className="pageContainer"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="filter"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            margin: "25px auto",
            borderTop: "5px solid #202e44",
          }}
        >
          <p style={{ color: "#8b734c", fontSize: "20px", fontWeight: "700" }}>
            Filter by
          </p>
          <Filter
            placeholder="Filter by title"
            value={filterTitle}
            onChange={onChangeTitle}
            onClear={handleClearFilterTitle}
          />
          <Filter
            placeholder="Filter by brand"
            value={filterBrand}
            onChange={onChangeBrand}
            onClear={handleClearFilterBrand}
          />
          <Filter
            placeholder="Filter by category"
            value={filterCategory}
            onChange={onChangeCategory}
            onClear={handleClearFilterCategory}
          />
          <Filter
            placeholder="Filter by price"
            value={filterPrice}
            onChange={onChangePrice}
            onClear={handleClearFilterPrice}
          />
          {/* <div
            className="filterItem"
            style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
          >
            <input
              type="text"
              placeholder="Filter by title"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
            />
            <button onClick={handleClearFilterTitle}>X</button>
          </div>
          <div
            className="filterItem"
            style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
          >
            <input
              type="text"
              placeholder="Filter by brand"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            />
            <button onClick={handleClearFilterBrand}>X</button>
          </div>
          <div
            className="filterItem"
            style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
          >
            <input
              type="text"
              placeholder="Filter by category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
            <button onClick={handleClearFilterCategory}>X</button>
          </div>
          <div
            className="filterItem"
            style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
          >
            <input
              type="text"
              placeholder="Filter by price"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            />
            <button onClick={handleClearFilterPrice}>X</button>
          </div> */}

          <button style={{ margin: "10px 0" }} onClick={handleClearAllFilter}>
            Clear All
          </button>
        </div>
        <div className="table" style={{ width: "80%" }}>
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
                  <td className="tableCellStyle">
                    <Link to={item.id.toString()}>{item.id}</Link>
                  </td>
                  <td className="tableCellStyle">{item.title}</td>
                  <td className="tableCellStyle">{item.brand}</td>
                  <td className="tableCellStyle">{item.category}</td>
                  <td
                    className="tableCellStyle"
                    style={{ color: "#8b734c", fontWeight: "bold" }}
                  >
                    € {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;

//TODO
//1. Roddelenie kódu do menších komponentov Filter a Tabuľka
//2. Filter -> filtrovanie podľa kategorie, brand zmeniť na dropdown
//3. Tabuľla -> urobiť sortovanie
//4. Optimalizácia dopytov - teraz sa načítavajú všetky dáta. Paginácia a loader
//5. UI/UX vylepšenia: pridávaním rôznych vizuálnych efektov, animácií alebo zlepšovaním použiteľnosti filtrov a tabuľky.
//6.
