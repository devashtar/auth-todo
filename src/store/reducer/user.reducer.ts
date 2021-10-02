import { UserState, UserActions } from "@types";

const initialState = {
    auth: false,
    id: '',
    expiredAccessToken: 0
} as UserState;

export default function user(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case 'SET_AUTH':
            return {...state, ...action.payload};
        case 'SET_ID':
            return {...state, ...action.payload};
        case 'SET_EXPIRED_ACCESS_TOKEN':
            return {...state, ...action.payload};
        default:
            return state
    }
}