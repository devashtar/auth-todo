import { UserActions, FormActions, TodoActions, AppActions, UserState, FormState, TodoState } from '@types';
import { ThunkAction } from 'redux-thunk';


type AllActions = UserActions | FormActions | TodoActions | AppActions;
type AllStates = {
    readonly user: UserState,
    readonly form: FormState,
    readonly todo: TodoState
}

type ThunkResult<R> = ThunkAction<R, AllStates, void, AllActions>

export function setPreloadApp(value: boolean):ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_PRELOAD',
            payload: value
        })
    }
}