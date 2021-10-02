import { TodoState, TodoActions } from "@types";

const initialState = [
  {
      id: 1,
      title: 'blabalblab greta tumberg blabalblab greta tumberg blabalblab greta tumberg blabalblab greta tumbergblabalblab greta tumberg blabalblab greta tumberg',
      completed: false
  },
  {
      id: 2,
      title: 'jklanwfjan awdawd awwd',
      completed: true
  },
  {
      id: 3,
      title: 'chiki brilkidwad awd',
      completed: false
  },
] as TodoState;

export default function todo(state = initialState, action: TodoActions): TodoState {
    switch (action.type) {
      case 'LOAD_TODO':
        return action.payload;
      case 'ADD_TASK':
        return state.concat([action.payload]);
      case 'REMOVE_TASK':
        return state.filter(task => task.id !== action.payload);
      case 'UPDATE_TASK':
        return state.map(task => task.id === action.payload.id ? action.payload : task);
      default:
        return state
    }
}