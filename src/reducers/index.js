import { combineReducers } from 'redux'
import { ADD, DONE } from '../actions/actionsTypes'
import uuidv4 from 'uuid'
// 原始默认state
const defaultState = {
  todo: [{
    text: '吃吃饭',
    id: uuidv4(),
    selected: true
  },{
    text: '睡睡觉',
    id: uuidv4(),
    selected: false
  },{
    text: '睡睡觉',
    id: uuidv4(),
    selected: true
  }]
}

function todo(state = defaultState, action) {
  switch (action.type) {
    case ADD:
      state.todo.push({...action, id: uuidv4()})
      return { ...state }
    case DONE:
      // state.todo.slice(0, index)
      state.todo[action.index].selected = !state.todo[action.index].selected
      return { ...state }
    default:
      return state
  }
}

export default combineReducers({
    todo
});
