import { UserActions, FormActions, TodoActions, AppActions, UserState, FormState, TodoState } from '@types';
import { ThunkAction } from 'redux-thunk';
import { loadTodoAPI, addTaskAPI, removeTaskAPI, updateTaskAPI } from '@API';
import { checkLocalStorageData } from '@services';
import { logout } from '@store/actions';


type AllActions = UserActions | FormActions | TodoActions | AppActions;
type AllStates = {
    readonly user: UserState,
    readonly form: FormState,
    readonly todo: TodoState
}

type ThunkResult<R> = ThunkAction<R, AllStates, void, AllActions>

type IPaylaod = {
    title?: string,
    completed?: boolean
}

export function loadTodoAction():ThunkResult<void> {
    return async (dispatch) => {
        const tokenObj = await checkLocalStorageData();

        if (typeof tokenObj === 'undefined') {
            dispatch(logout());
            alert('ERROR: TOKEN NOT FOUND! (localStorage)');
            return;
        } 

        const { accessToken, userId } = tokenObj;

        const result = await loadTodoAPI({accessToken, userId});

        const arr = Array.isArray(result) ? result : [];
        
        dispatch({
            type: 'LOAD_TODO',
            payload: arr
        })
    }
}

export function addTaskAction(title: string):ThunkResult<void> {
    return async (dispatch) => {

        const tokenObj = await checkLocalStorageData();

        if (typeof tokenObj === 'undefined') {
            dispatch(logout());
            alert('ERROR: TOKEN NOT FOUND! (localStorage)');
            return ;
        }

        const { accessToken, userId } = tokenObj;

        const result = await addTaskAPI({accessToken, userId, payload: {title}});
        

        if (typeof result === 'undefined') return alert('ERROR: TASK NOT ADDED!');

        dispatch({
            type: 'ADD_TASK',
            payload: result
        })
    }
}

export function removeTaskAction(taskId: number):ThunkResult<void> {
    return async (dispatch) => {

        const tokenObj = await checkLocalStorageData();

        if (typeof tokenObj === 'undefined') {
            dispatch(logout());
            alert('ERROR: TOKEN NOT FOUND! (localStorage)');
            return ;
        } 

        const { accessToken, userId } = tokenObj;

        const result = await removeTaskAPI({accessToken, userId, taskId});

        if (typeof result === 'undefined') return alert('ERROR: TASK NOT REMOVED!');

        dispatch({
            type: 'REMOVE_TASK',
            payload: taskId
        })
    }
}

export function updateTaskAction(taskId: number, payload: IPaylaod):ThunkResult<void> {
    return async (dispatch) => {

        const tokenObj = await checkLocalStorageData();

        if (typeof tokenObj === 'undefined') {
            dispatch(logout());
            alert('ERROR: TOKEN NOT FOUND! (localStorage)');
            return;
        } 

        const { accessToken, userId } = tokenObj;

        const result = await updateTaskAPI({accessToken, userId, taskId, payload});

        if (typeof result === 'undefined') return alert('ERROR: TASK NOT UPDATED!');

        dispatch({
            type: 'UPDATE_TASK',
            payload: result
        })
    }
}