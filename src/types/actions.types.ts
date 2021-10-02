import { type } from 'os';
import { ITask, FormState } from './states.types';
// ACTIONS TYPES
// ==============================
export type UserActions = { 
    type: 'SET_AUTH'; 
    payload: { auth: boolean } 
} | { 
    type: 'SET_ID'; 
    payload: { id: string }
} | { 
    type: 'SET_EXPIRED_ACCESS_TOKEN'; 
    payload: { expiredAccessToken: number }
};
// ==============================
export type FormActions = { 
    type: 'SET_LOADING_FORM'; 
    payload: { loading: boolean } 
} | {
    type: 'SET_DISPLAY_FORM'; 
    payload: { displayForm: boolean }
} | {
    type: 'SET_TYPE_FORM'; 
    payload: { typeForm: boolean }
} | {
    type: 'SET_ERROR_MESSAGE_FORM'; 
    payload: { error: FormState['error'] }
};
// ==============================
export type TodoActions = { 
    type: 'LOAD_TODO'; 
    payload: Array<ITask>;
} | { 
    type: 'ADD_TASK'; 
    payload: ITask;
} | { 
    type: 'REMOVE_TASK'; 
    payload: number;
} | { 
    type: 'UPDATE_TASK'; 
    payload: ITask;
};
// ==============================
export type AppActions = {
    type: 'SET_PRELOAD';
    payload: boolean
}
// ==============================