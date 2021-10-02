import { UserActions, FormActions, TodoActions, AppActions, UserState, FormState, TodoState, IBodyReq } from '@types';
import { ThunkAction } from 'redux-thunk';
import { setAuthUser, setIdUser, setExpiresATUser } from '@store/actions';
import { recordToLocalStorage } from '@services';
import { regUserAPI, authUserAPI } from '@API';

type AllActions = UserActions | FormActions | TodoActions | AppActions;
type AllStates = {
    readonly user: UserState,
    readonly form: FormState,
    readonly todo: TodoState
}

type ThunkResult<R> = ThunkAction<R, AllStates, void, AllActions>

export function setLoadingForm(value: boolean):ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_LOADING_FORM',
            payload: {loading: value}
        })
    }
}

export function showForm():ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_DISPLAY_FORM',
            payload: {displayForm: true}
        })
    }
}

export function hiddenForm():ThunkResult<void> {
    return async (dispatch) => {
        dispatch(setCleanErrorForm());
        dispatch({
            type: 'SET_DISPLAY_FORM',
            payload: {displayForm: false}
        })
    }
}

export function setAuthForm():ThunkResult<void> {
    return async (dispatch) => {
        dispatch(setCleanErrorForm());
        dispatch(showForm());
        dispatch({
            type: 'SET_TYPE_FORM',
            payload: {typeForm: true}
        })
    }
}

export function setRegForm():ThunkResult<void> {
    return async (dispatch) => {
        dispatch(setCleanErrorForm());
        dispatch(showForm());
        dispatch({
            type: 'SET_TYPE_FORM',
            payload: {typeForm: false}
        })
    }
}

export function setErrorForm(newErrorObj: {[index: string]: string}):ThunkResult<void> {
    return async (dispatch, getState) => {
        const curErrorObj = getState().form.error;

        dispatch({
            type: 'SET_ERROR_MESSAGE_FORM',
            payload: {error: {...curErrorObj, ...newErrorObj}}
        })
    }
}

export function setCleanErrorForm():ThunkResult<void> {
    return async (dispatch, getState) => {
        const errorObj = getState().form.error;

        const newErrorObj: FormState['error'] = Object.keys(errorObj).reduce((acc, val) => (acc[val] = '', acc), {} as any);

        dispatch({
            type: 'SET_ERROR_MESSAGE_FORM',
            payload: {error: newErrorObj}
        })
    }
}

export function sendRegDataForm(dataObj: IBodyReq):ThunkResult<void> {
    return async (dispatch) => {
        try {
            const result = await regUserAPI(dataObj);
            if (result) {
                alert('You are successfully registered!');
                dispatch(setAuthForm());
            } else {
                throw new Error(`Try again, that's something wrong!`)
            }

        } catch(e) {
            alert(e);
        }

    }
}

export function sendAuthDataForm(dataObj: IBodyReq):ThunkResult<void> {
    return async (dispatch) => {
        try {
            const result = await authUserAPI(dataObj);
            if (!result) throw new Error('Login or password is wrong, try again!')
            
            result.expiresAccessToken += Date.now();
            dispatch(setIdUser(result.userId));
            dispatch(setExpiresATUser(result.expiresAccessToken));
            dispatch(setAuthUser(true));
            recordToLocalStorage(result);
        } catch(e) {
            console.log(e);
        }
    }
}
