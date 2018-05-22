import {combineReducers} from 'redux'
import {navReducer} from './navReducer'
import {dialog} from "./dialogReducer";

const reducers = combineReducers({
    nav: navReducer,
    dialog
});

export default reducers
