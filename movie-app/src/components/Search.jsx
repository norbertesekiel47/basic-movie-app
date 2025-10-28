import React from 'react';

const Search = ({searchTerm, setSearchTerm}) => {
    return ( 
        <div className="search">
            <div>
                <img src="search.svg" alt="Search" /> 
                <input 
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
                />
            </div>
        </div>
    )
}
 
export default Search;