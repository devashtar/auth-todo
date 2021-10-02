import React from 'react';
import './style.scss';

import { RootState } from '@store';
import { useSelector } from 'react-redux';

import Nav from '@components/Nav';
import Form from '@components/Form';


function Home() {

    const { displayForm, typeForm } = useSelector((state: RootState) => state.form);

    return (
        <div className='home'>
            <Nav />
            {displayForm ? <Form typeForm={typeForm} /> : '' } 
        </div>
    );
}

export default Home;