import { ADD, DONE } from './actionsTypes'

const add = (text) => ({ text: text, type: ADD })
const done = (index) => {
  return {
    type: DONE,
    index: index
  }
}

export {
    add,
    done
}
