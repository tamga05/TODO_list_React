import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void

}


export function Todolist(props: PropsType) {


    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const tsarChangeFilter = (valueFilter: FilterValuesType) => {
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>

            <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>


            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li key={t.id}>

                            <input type="checkbox" checked={t.isDone}/>

                            <span>{t.title}</span>

                            <button onClick={() => removeTaskHandler(t.id)}>x</button>

                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() => tsarChangeFilter('all')}>
                All
            </button>
            <button onClick={() => tsarChangeFilter('active')}>
                Active
            </button>
            <button onClick={() => tsarChangeFilter('completed')}>
                Completed
            </button>
        </div>
    </div>
}

