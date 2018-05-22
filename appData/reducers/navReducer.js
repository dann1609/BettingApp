import {initialState, AppNavigator} from '../config/navigators/appNavigator'

export const navReducer = (state = initialState, action) => {
    //console.log('navReducer state: '+JSON.stringify(state));
    //dev.log('navReducer action: '+JSON.stringify(action));

    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.

    //dev.log('actual route: '+actualRouteName);

    if (true) {
        return nextState || state;
    } else {
        return state;
    }
};