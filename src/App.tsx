import React, { useEffect } from 'react';
import './App.scss';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store';
import { checkUserAuth } from '@store/actions';

import TodoPage from '@pages/Todo';
import Home from '@pages/Home';


function App() {

    const auth = useSelector((state: RootState) => state.user.auth);
    const preload = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkUserAuth());  // Important! (check logic inside "checkUserAuth")
    }, [])

    if (preload) return (<div>LOADING...</div>)

    return (
        <div className='app'>
            <BrowserRouter>
                <Switch>
                    <Route path="/todo-page">
                        {auth ? <TodoPage /> : <Redirect to='/' />}
                    </Route>
                    <Route path="/">
                        {auth ? <Redirect to='/todo-page' /> : <Home />}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;

// check aliases in the file by name "tsconfig.paths.json and config overrides.js" (also you can add it own)

// work with components
// Attention!
// Don't confuse path to component:
// Global folder(@components) !== folder(Children/components) that includes children components 
