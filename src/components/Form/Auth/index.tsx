import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store';
import { hiddenForm, setErrorForm } from '@store/actions';

type IKey = 'email' | 'password' | 'passwordConfirm' | 'alertMessage';

type IData = { email: string, password: string}

type props = {
    setData: React.Dispatch<React.SetStateAction<IData>>
}


function Auth({setData}: props) {

    const dispatch = useDispatch<AppDispatch>();
    const {loading, error} = useSelector((state: RootState) => state.form);
    const [state, setState] = useState({email: '', password: ''});
    const [permission, setPermission] = useState(false);
    const memoizedCallBack = useCallback(() => {
        const { email, password } = state;
        if (email === '---') setState(state => ({...state, email: ''}));
        if (password === '---') setState(state => ({...state, password: ''}));
    }, [state])

    const typeHandler = (value: string, key: IKey) => {
        setState(state => ({...state, [key]: value}));
    }

    const onBlurHandler = (value: string, key: string) => {
        if (value === '') return;
        if (value.trim() === '') return setState(state => ({...state, [key]: '---'}));
    }

    useEffect(() => {
        if (state.email === '') dispatch(setErrorForm({email: ''}));
        if (state.email !== '') {
            if (!emailValidator(state.email)) return dispatch(setErrorForm({email: 'Invalid email'}));
            return dispatch(setErrorForm({email: ''}));
        }
    }, [state.email])
    
    useEffect(() => {
        if (state.password === '') dispatch(setErrorForm({password: ''}));
        if (state.password !== '') {
            if (!/^([a-z0-9]){6,30}$/i.test(state.password)) return dispatch(setErrorForm({password: 'Invalid password'}));
            return dispatch(setErrorForm({password: ''}));
        }
    }, [state.password]);

    useEffect(() => {
        memoizedCallBack();
    }, [memoizedCallBack]);

    useEffect(() => {
        for (const val of Object.values(error)) {   // check error obj
            if (val !== '') return setPermission(true);
        }
        for (const val of Object.values(state)) {
            if (val === '') return setPermission(true);
        }
        setPermission(false)
    }, [error])

    // SUBMIT
    const onSubmitEvent = () => {
        setData(state);
    }

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <h2 className='title'>Authentification</h2>
            <div className='input__wrapper'>
                <div className='label'>email</div>
                <input
                    className='input' 
                    type='text' // ATTEMPTION! dont use type 'email' (react don't recognize spaces)
                    onInput={(e: ChangeEvent<HTMLInputElement>) => typeHandler(e.target.value, 'email')}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => onBlurHandler(e.target.value, 'email')}
                    onFocus={() => dispatch(setErrorForm({'email': ''}))}
                    value={state.email}
                />
                <div className='error__message'>{error.email}</div>
            </div>
            <div className='input__wrapper'>
                <div className='label'>password</div>
                <input
                    className='input'
                    type='password'
                    onInput={(e: ChangeEvent<HTMLInputElement>) => typeHandler(e.target.value, 'password')}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => onBlurHandler(e.target.value, 'password')}
                    onFocus={() => dispatch(setErrorForm({'password': ''}))}
                    value={state.password}
                />
                <div className='error__message'>{error.password}</div>
            </div>
            <div className='btn__wrapper'>
                <input
                    className='btn'
                    type='button'
                    value='submit'
                    disabled={loading || permission}
                    onClick={() => onSubmitEvent()}
                />
                <input
                    className='btn'
                    type='button'
                    value='cancel'
                    onClick={() => dispatch(hiddenForm())}
                />
            </div>
        </form>
    );
}

function emailValidator(value: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export default Auth;