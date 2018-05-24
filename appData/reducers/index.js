import {combineReducers} from 'redux'
import {navReducer} from './navReducer'
import {dialog} from "./dialogReducer";
import {user} from "./userReducer";
import {matches} from "./matchesReducer";
import {teams} from "./teamsReducer";
import {stadiums} from "./stadiumsReducer";
import {usersList} from "./usersListReducer";

const reducers = combineReducers({
    nav: navReducer,
    dialog,
    user,
    matches,
    teams,
    stadiums,
    usersList
});

export default reducers
