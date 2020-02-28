import React, { useState } from 'react';

import { _levels } from '../model/state';

export default function Task({index,task,handleEditTask,handleDeleteTask}) {
    const [levels] = useState(_levels);

    let onClickEdit = (task) => {
        handleEditTask(task)
    }
    let onClickDelete = (id) => {
        handleDeleteTask(id);
    }

    return(
        <tr>
            <td className="text-center">{index+1}</td>
            <td>{task.name}</td>
<           td className="text-center"><span className={`badge ${levels[task.level].tag}`}>{levels[task.level].name}</span></td>
            <td>
                <button type="button" className="btn btn-warning" onClick={() => onClickEdit(task)}>Edit</button>
                <button type="button" className="btn btn-danger ml-2" onClick={() => onClickDelete(task.id)}>Delete</button>
            </td>
        </tr>
    );
}
