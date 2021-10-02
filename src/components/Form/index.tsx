import React, { useEffect, useState } from 'react';
import './style.scss';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { sendRegDataForm, sendAuthDataForm } from '@store/actions';

import Auth from './Auth';
import Reg from './Reg';

type props = {
    typeForm: boolean   // true = auth; false = reg
}

function Form({typeForm}: props) {

    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState({email: '', password: ''});

    useEffect(() => {
        if (data.email === '' || data.password === '') return;
        if (typeForm) { // auth
            dispatch(sendAuthDataForm(data))
        } else { // reg
            dispatch(sendRegDataForm(data))
        }
    }, [data])

    return (
        <div className='form__wrapper'>
            {typeForm ? <Auth setData={setData} /> : <Reg setData={setData} />}
        </div>
    );
}

export default Form;