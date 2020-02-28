import React, { useState, useEffect, useCallback } from 'react';
import uuid from 'react-uuid';

import Title from './components/Title';
import Sort from './components/Sort';
import Search from './components/Search';
import Add from './components/Add';
import Modal from './components/Modal';
import List from './components/List';

import _tasks, {_order} from './model/state';

function App() {   
  const [tasks, setTasks] = useState(_tasks);
  const [textSearch, setTextSearch] = useState('');
  const [order, setOrder] = useState(_order);
  const [isVisible, setIsVisible] = useState(false);
  const [oneTask, setOneTask] = useState({
    id: '',
    name: '',
    level: 0
  })

  const onCancel = useCallback(
    () => {
      setIsVisible(false);          
    },
    []
  )

  const onSave = useCallback(
    () => {
            
      if(oneTask.name) {
        //Add
        if(!oneTask.id) {
          tasks.push({
            id: uuid(),
            name: oneTask.name,
            level: oneTask.level
          });          
        }
        //Edit
        else {
          tasks.forEach((element, index) => {
            if(element.id === oneTask.id) {
              tasks[index].name = oneTask.name;
              tasks[index].level = oneTask.level;
            }
          });
        }      
        setTasks(tasks);
        setIsVisible(false);
        setOneTask({
          id: '',
          name: '',
          level: 0
        })  
      }
      else {
        alert("Please Input Task Name!");
      }
    },
    [oneTask,tasks]
  )

  let injectedPropsModal = {
    isVisible,
    isRenderHeader: true,
    title: 'Add Task',
    onSave,
    onCancel,
    isRenderCloseIcon: true,
    renderFooter: () => {
      return (
        <>
          <button className='btn btn-secondary' onClick={() => setIsVisible(false)}>Cancel</button>
          <button className='btn btn-info' onClick={() => onSave()}>Submit</button>
        </>
      )
    }
  }

  let handleSearch = (text) => {
    setTextSearch(text);   
  } 

  let handleClearSearch = () => {
    setTextSearch('');
  }

  let handleSort = (type,direction) => {
    setOrder({
      type,
      direction
    });
    tasks.sort(compareValues(type,direction))
    setTasks(tasks);
  } 

  let compareValues = (key, order='asc') => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;   
      }
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
          comparison = 1;
      } else if (varA < varB) {
          comparison = -1;
      }
      return (
          (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  
  let handleOpenForm = () => {
    setIsVisible(true);
    setOneTask({
      id: '',
      name: '',
      level: 0
    }) 
  }


  let onChangeAdd = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    if(name === 'level') {
      value =  parseInt(target.value)
    }
    setOneTask({
      ...oneTask,
      [name]: value
    });
  }
  
  let handleEditTask = (task) => {
    setOneTask(task);
    setIsVisible(true);
  }

  let handleDeleteTask = (id) => {
    let result = window.confirm("Are you sure to delete this item?");
    if (result) {
      const filteredTasks = tasks.filter(task => task.id !== id);
		  setTasks(filteredTasks);
    }
  }

  let returnTasks = (list) => {
    return list.filter(item => {
      let taskName = item.name.toLowerCase();
      return taskName.indexOf(textSearch.toLowerCase()) !== -1
    });
  }
  
  return (
    <div className="container">
    {/* TITLE : START */}
    <Title/>
    {/* TITLE : END */}

    {/* CONTROL (SEARCH + SORT + ADD) : START */}
    <div className="row">      
      <div className="col-12 col-lg-6">
        <Search textSearch={textSearch}
                handleSearch = {handleSearch}
                handleClearSearch = {handleClearSearch}
        />
      </div>
      <div className="col-12 col-lg-3 text-center">
        <Sort order = {order}
              handleSort = {handleSort}
        />
      </div>
      <div className="col-12 col-lg-3">
        <Add handleOpenForm={handleOpenForm}/>
      </div>
    </div>
    {/* CONTROL (SEARCH + SORT + ADD) : END */}

    {/* FORM : START */}
    <Modal {...injectedPropsModal}>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Input Task Name</label>
        <div className="col-sm-8">
          <input onChange = {onChangeAdd} value={oneTask.name} type="text" name="name" className="form-control" placeholder="Task Name" />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Select Task Level</label>
        <div className="col-sm-8">
          <select onChange = {onChangeAdd} value={oneTask.level} name="level" className="form-control" required="required">
            <option value={0}>Small</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>
      </div>
    </Modal>
    {/* FORM : END */}
    

    {/* LIST : START */}
    <List tasks={returnTasks(tasks)}
          handleEditTask={handleEditTask}
          handleDeleteTask = {handleDeleteTask}
    />
    {/* LIST : END */}

  </div>
);
}

export default App;
