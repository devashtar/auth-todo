import React from 'react'
import './style.scss'
import Input from './Input'
import Task from './Task'
import { useSelector } from 'react-redux'
import { RootState } from '@store';

function Todolist() {

    const todo = useSelector((state: RootState) => state.todo)
    
    return (
        <div className='todolist__wrapper'>
            <div className='todolist'>
                <Input />
                <ul className='task__list'>
                    {todo.length !== 0 ? todo.map(item => (<Task key={item.id} {...item} />)) : 'NOTHING'}
                </ul>
            </div>
        </div>
    )
}

export default Todolist;