import React from 'react';
import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { setAuthForm, setRegForm, logout } from '@store/actions';

type actionFunc = typeof setAuthForm | typeof setRegForm; // get type from these functions

function Nav() {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.user.auth);

    const showForm = (func: actionFunc) => {
        dispatch(func());
    }

    return (
        <nav className='nav'>
            <div className='logo__wrapper'>
                <h1 className='logo'>Logo</h1>
            </div>
            <div className='btn__wrapper'>
                {auth ? 
                <button className='btn' onClick={() => dispatch(logout())}>logout</button>
                :
                <>
                    <button className='btn' onClick={() => showForm(setAuthForm)}>sing in</button>
                    <button className='btn' onClick={() => showForm(setRegForm)}>sing up</button>
                </>
                }
            </div>
        </nav>
    )
}

export default Nav;
