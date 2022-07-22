import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [todolistID: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({  // А почему создаем Объект, а не массив, как выше на 20?
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
        ]
    });

    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    function changeFilter(todolistID: string, filter: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: filter} : el))
    }

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map((el: TodolistsType) => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasksForTodolist}

                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )
}

export default App;
