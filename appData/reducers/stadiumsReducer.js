export const stadiumsType = {
    SET_STADIUMS: 'SET_STADIUMS',
};


export const stadiums = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case stadiumsType.SET_STADIUMS:
            newState = Object.assign({}, state, action.stadiums);
            return newState;
        default:
            return state;
    }
}
