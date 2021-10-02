import React from 'react';

import { ITask } from '@types';
import { useDispatch } from 'react-redux'; 
import { updateTaskAction, removeTaskAction } from '@store/actions';
import { AppDispatch } from '@store'


function Task(item: ITask) {

    const dispatch = useDispatch<AppDispatch>(); 

    const doneTask = () => {
        const newTaskObj = {title: item.title, completed: !item.completed}
        dispatch(updateTaskAction(item.id, newTaskObj))
    }

    const removeTask = () => {
        dispatch(removeTaskAction(item.id));
    }
    
    return (
        <li className='task'>
            <div className={item.completed ? 'title done' : 'title'}>{item.title}</div>
            <button className='btn' onClick={() => doneTask()}>done</button>
            <button className='btn' onClick={() => removeTask()}>delete</button>
        </li>
    )
}

export default Task;