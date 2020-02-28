import uuid from 'react-uuid';


let _tasks = [
    {
        id: uuid(),
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        level: 0 //Small
    },
    {
        id: uuid(),
        name: 'Ut enim ad minim veniam',
        level: 2 //High
    },
    {
        id: uuid(),
        name: 'Excepteur sint occaecat cupidatat non proident',
        level: 1 //Medium
    }
];

let _levels = [
    {
        name: 'Small',
        tag: 'badge-info'
    },
    {
        name: 'Medium',
        tag: 'badge-warning'
    },
    {
        name: 'High',
        tag: 'badge-danger'
    }
];

let _order = {
    type: 'name',
    direction: 'asc'
}

export {
    _levels,
    _order
  };
export default _tasks;