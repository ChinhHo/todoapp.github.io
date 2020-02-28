import React from 'react';

export default function Sort({order,handleSort}) {

    let onSelectSearch = (orderType,orderDirection) => {
        handleSort(orderType,orderDirection);
    }

    let orderStatus = (order.type + ' - ' + order.direction).toUpperCase();
    return (
    

        <div className="form-group">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button onClick={() =>  onSelectSearch('name', 'asc')} className="dropdown-item">Name ASC</button>
                        <button onClick={() =>  onSelectSearch('name', 'desc')} className="dropdown-item">Name DESC</button>
                        <div className="dropdown-divider" />
                        <button onClick={() =>  onSelectSearch('level', 'asc')} className="dropdown-item">Level ASC</button>
                        <button onClick={() =>  onSelectSearch('level', 'desc')} className="dropdown-item">Level DESC</button>
                    </div>
                    <span className="badge badge-success badge-medium">{orderStatus}</span>
                </div>
            </div>
    );
}