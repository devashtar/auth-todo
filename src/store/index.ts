import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducer';
import { UserActions, FormActions, TodoActions, UserState, FormState, TodoState } from '@types';

type AllActions = UserActions | FormActions | TodoActions;
type AllStates = {
    user: UserState,
    form: FormState,
    todo: TodoState
};

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AllStates, AllActions>));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// rootReducer includes several reducers join with help a 'combineReducers'