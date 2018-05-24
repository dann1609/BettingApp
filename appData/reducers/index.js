import {combineReducers} from 'redux'
import {navReducer} from './navReducer'
import {dialog} from "./dialogReducer";
import {user} from "./userReducer";
import{matches} from "./matchesReducer";

const reducers = combineReducers({
    nav: navReducer,
    dialog,
    user,
    matches
});

export default reducers
