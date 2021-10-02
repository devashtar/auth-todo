import { combineReducers } from 'redux'
import user from './user.reducer';
import form from './form.reducer';
import todo from './todo.reducer';
import app from './app.reducer';

export default combineReducers({
    user,
    form,
    todo,
    app
})