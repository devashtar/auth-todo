import React, { ChangeEvent, useState } from 'react'

import { useDispatch } from 'react-redux'; 
import { addTaskAction } from '@store/actions';
import { AppDispatch } from '@store'

function Input() {

    const dispatch = useDispatch<AppDispatch>()
    const [val, setVal] = useState('');

    const addTask = () => {
        if (val.trim() === '') return setVal('');
        dispatch(addTaskAction(val))
    }
    
    return (
        <div className='form'>
            <input 
                className='input'
                type='text'
                onInput={(e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
                value={val}
                placeholder='input name current task...'
            />
            <input 
                className='btn'
                type='button'
                onClick={() => addTask()}
                value='+'
            />
        </div>
    )
}

export default Input;