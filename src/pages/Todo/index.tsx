import React, { useEffect } from 'react';
import './style.scss';

import Nav from '@components/Nav';
import Todolist from '@components/Todolist'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { loadTodoAction } from '@store/actions';


function Todo() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadTodoAction())
    }, [])

    return (
        <div className='todo'>
            <Nav />
            <Todolist />
        </div>
    )
}

export default Todo;
