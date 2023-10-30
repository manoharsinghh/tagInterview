import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((apiData) => {
        const uniqueCategories = Array.from(
          new Set(apiData.entries.map((entry) => entry.Category))
        );
        setCategories(uniqueCategories);
        console.log(apiData);
        setFilterData(apiData.entries);
        setData(apiData.entries);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value === "All") {
      setData(filterData);
    } else {
      const filteredData = filterData.filter(
        (entry) => entry.Category.toLowerCase() === e.target.value.toLowerCase()
      );
      setData(filteredData);
    }
  };

  const handleFilter = (value) => {
    const results = filterData.filter((entry) =>
      entry.Description.toLowerCase().includes(value)
    );
    const result = filterData.filter((entry) =>
      entry.Category.toLowerCase().includes(value)
    );
    setData(result);
    setData(results);
  };

  return (
    <>
      <div className="search-top">
        <div className="search">
          <input
            type="text"
            placeholder="search here..."
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>

        <div className="categorylist">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">Select</option>
            {categories.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="search-result">
          <div className="searchresult">
            <div className="tags">
              <div className="tag">Category---</div>
              <div className="tag">Description---</div>
            </div>

            {data.map((entry, i) => (
              <div className="resultdata" key={i}>
                <div> {entry.Category}</div>
                <div className="onLink">
                  <div>{entry.Description}</div>
                  <a href={entry.Link} target="_blank">
                    ....
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* <div>
            <h1 className="tag">Description---</h1>
            {data.map((entry, i) => (
              <div className="resultdata" key={i}>
              {entry.Description}
              
              <a href={entry.Link}  target="_blank" className='onLink'> </a>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Search;
