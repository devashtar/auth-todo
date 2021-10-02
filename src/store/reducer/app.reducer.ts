import { AppActions } from '@types'

type AppState = boolean;

const initialState = true;

export default function app(state = initialState, action: AppActions): AppState {
    switch (action.type) {
      case 'SET_PRELOAD':
        return action.payload
      default:
        return state
    }
}