


export const teamsType = {
    SET_TEAMS: 'SET_TEAMS',
};


export const teams= (state = {}, action) => {
    let newState;
    switch (action.type) {
        case teamsType.SET_TEAMS:
            newState = Object.assign({}, state, action.teams);
            return newState;
        default:
            return state;
    }
}
