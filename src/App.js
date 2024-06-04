import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import LimitInput from './components/LimitInput';
import axios from 'axios';
import './style.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL, {
      params: { countryIds: 'IN', namePrefix: searchTerm, limit: itemsPerPage },
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    });
    setCities(response?.data?.data);
    console.log("resp:", response)
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = () => {
    if(itemsPerPage>10) return alert("Maximum item limit is 10 !")
    fetchData();
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (value) => {
    setItemsPerPage(value);
  };

  return (
    <div className="App">
      <SearchBox
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
      />
      <Table cities={cities} loading={loading} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={cities?.length}
        onPageChange={handlePaginationChange}
      />
      <LimitInput value={itemsPerPage} onChange={handleLimitChange} />
      <br />
    </div>
  );
}

export default App;
