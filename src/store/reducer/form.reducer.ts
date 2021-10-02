import { FormState, FormActions } from "@types";

const initialState = {
    loading: false,
    displayForm: false,
    typeForm: false,    // false = Reg; true = Auth
    error: {
      email: 'Invalid email(template error)',
      password: 'Invalid password(template error)',
      passwordConfirm: 'Confirm password does not match(template error)',
      alertMessage: ''  // this is for alert message
    }
} as FormState ;

export default function form(state = initialState, action: FormActions): FormState {
    switch (action.type) {
      case 'SET_LOADING_FORM':
        return {...state, ...action.payload};
      case 'SET_TYPE_FORM':
        return {...state, ...action.payload};
      case 'SET_DISPLAY_FORM':
        return {...state, ...action.payload};
      case 'SET_ERROR_MESSAGE_FORM':
        return {...state, ...action.payload};
      default:
        return state
    }
}