import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'ReactJS', isDone: false}
    ]);


    const removeTask = (elid: number) => {
        tasks = tasks.filter((el) => el.id !== elid);
        setTasks(tasks);
        console.log(tasks);
    };


    // const [filterValue, setFilterValue] = useState('All');
    //
    //
    // let filteredTasks = tasks; // Типа записано значение 'All'
    //
    // if (filterValue === 'Active') {
    //     filteredTasks = tasks.filter(el => el.isDone);
    // }
    //
    // if (filterValue === 'Completed') {
    //     filteredTasks = tasks.filter(el => !el.isDone);
    // }
    //
    //
    // const changeTasksFilter = (buttonName: string) => {
    //     setFilterValue(buttonName);
    //
    // };

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                // changeTasksFilter={changeTasksFilter}
            />
        </div>

    );
}


export default App;
