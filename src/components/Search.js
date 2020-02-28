import React from 'react';

export default function Search({textSearch,handleSearch}) {

    let onChangInputSearch = (event) => {
        let searchInput = event.target.value;
        handleSearch(searchInput);
    }

    return (
        <div className="input-group">
            <input value={textSearch} onChange={onChangInputSearch} type="text" className="form-control" placeholder="Search for..." />
            <span className="input-group-append">
                <button className="btn btn-info" type="button">Clear!</button>
            </span>
        </div>
    );
}