import React from 'react';

export default function Add({handleOpenForm}) {
    let onClickAdd = () => {
        handleOpenForm();
    }
    return (
        <div className="form-group add-task">
            <button type="button" className="btn btn-info btn-block" onClick={onClickAdd}>Add Task</button>
        </div>
    );
}