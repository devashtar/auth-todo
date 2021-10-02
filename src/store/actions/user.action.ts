import { UserActions, FormActions, TodoActions, AppActions, UserState, FormState, TodoState } from '@types'
import { ThunkAction } from 'redux-thunk'
import { setPreloadApp } from '@store/actions';
import { checkLocalStorageData, updateTokens, logoutUserService } from '@services';

type AllActions = UserActions | FormActions | TodoActions | AppActions;
type AllStates = {
    user: UserState,
    form: FormState,
    todo: TodoState
};

type ThunkResult<R> = ThunkAction<R, AllStates, void, AllActions>

export function setAuthUser(value: boolean):ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_AUTH',
            payload: {auth: value}
        })
    }
}

export function setIdUser(userId: string):ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_ID',
            payload: {id: userId}
        })
    }
}

export function setExpiresATUser(num: number):ThunkResult<void> {
    return async (dispatch) => {
        dispatch({
            type: 'SET_EXPIRED_ACCESS_TOKEN',
            payload: {expiredAccessToken: num}
        })
    }
}

export function checkUserAuth():ThunkResult<void> {
    return async (dispatch) => {
        const result = await checkLocalStorageData();
        if (!result) {
            dispatch(setPreloadApp(false));  //!!! switch the loading to the app
            return;
        }
        const { userId, expiresAccessToken } = result;
        dispatch(setIdUser(userId));
        dispatch(setExpiresATUser(expiresAccessToken));
        dispatch(setAuthUser(true));

        dispatch(setPreloadApp(false));   //!!! switch the loading to the app
    }
}

export function refreshToken():ThunkResult<void>  {
    return async (dispatch) => {
        const result = await updateTokens();

        if (!result) {
            dispatch(setIdUser(''));
            dispatch(setExpiresATUser(0));
            dispatch(setAuthUser(false));
            return;
        }

        const { userId, expiresAccessToken } = result;
        dispatch(setIdUser(userId));
        dispatch(setExpiresATUser(expiresAccessToken));
        dispatch(setAuthUser(true));

    }
}

export function logout():ThunkResult<void>  {
    return async (dispatch) => {
        logoutUserService();

        dispatch(setIdUser(''));
        dispatch(setExpiresATUser(0));
        dispatch(setAuthUser(false));
        return;
    }
}