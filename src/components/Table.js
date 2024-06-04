import React from 'react'

function Table({ cities, loading }) {
  if (loading) return <p className="loading">Loading..</p>
  if (cities == null) return

  return (
    <div className="table">
      {!loading && cities.length === 0 && <div>No result found</div>}
      {!loading && cities.length > 0 && (
        <>
          <div className="table-header">
            <span>#</span>
            <span>Name</span>
            <span>Country</span>
          </div>
          {cities.map((city, index) => (
            <div key={index} className="table-row">
              <span>{index + 1}</span>
              <span>{city.name}</span>
              <div className="city-col">
                <span>{city.country}</span>
                <span>
                  <img
                    src={`https://flagsapi.com/${city?.countryCode}/flat/64.png`}
                    alt={`${city.name} flag`}
                  />
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Table
