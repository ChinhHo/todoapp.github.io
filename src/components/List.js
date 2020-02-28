import React from 'react';

import Task from './Task';

export default function List({tasks,handleEditTask,handleDeleteTask}) {
    return (
        <div className="card">
        <div className="card-header">List Task</div>
            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th style={{width: '10%'}} className="text-center">#</th>
                        <th>Task</th>
                        <th style={{width: '20%'}} className="text-center">Level</th>
                        <th style={{width: '160px'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
					{/* <tr>
						<td className="text-center">1</td>
						<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ea c</td>
						<td className="text-center"><span className="badge badge-danger">High</span></td>
						<td>
							<button type="button" className="btn btn-warning">Edit</button>
							<button type="button" className="btn btn-danger ml-2">Delete</button>
						</td>
					</tr> */}	
					{
						tasks.map((task, index) => 
							<Task 	key={index}
									task={task} 
									index={index}
									handleEditTask={handleEditTask}
									handleDeleteTask = {handleDeleteTask}
							/>
						)
					}				
					{/* <Task/> */}
				</tbody>
            </table>
        </div>
    );
}