import React from "react";

function Search({searchInput, setSearchInput}){

    return (
        <div>
            <input 
            className="bg-white border-2 border-gray-500 rounded-lg dark:bg-gray-500 m-10 p-1 w-96"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            />
        </div>
    )
}

export default Search;