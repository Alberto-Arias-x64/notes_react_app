import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import {user_notes,notes} from './reducers/notasredux'
import {user} from './reducers/userredux'
import thunk from "redux-thunk"

const reducer = combineReducers({
    notes,
    user
})

export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))