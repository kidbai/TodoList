import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/'

const store = createStore (
    rootReducer,
    compose (
        applyMiddleware(createLogger())
    )
)

export default store;
