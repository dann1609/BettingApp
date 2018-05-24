


export const userListType = {
    SET_USERS_LIST: 'SET_USERS_LIST',
};


export const usersList= (state = {}, action) => {
    let newState;
    switch (action.type) {
        case userListType.SET_USERS_LIST:
            newState = Object.assign({}, state, action.usersList);
            return newState;
        default:
            return state;
    }
}
