/**
 * React Native App
 * Made by Daniel Padilla
 */


export const matchesType = {
    EDIT_MATCH: 'EDIT_MATCH',
};


export const matches = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case matchesType.EDIT_MATCH:
            newState = Object.assign({}, state, {[action.matchRef]:action.match});
            return newState;
        default:
            return state;
    }
}
