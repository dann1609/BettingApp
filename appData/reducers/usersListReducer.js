


export const userListType = {
    SET_USERS_LIST: 'SET_USERS_LIST',
    UPDATE_USER_IN_LIST:'UPDATE_USER_IN_LIST'
};


export const usersList= (state = {}, action) => {
    let newState;
    switch (action.type) {
        case userListType.SET_USERS_LIST:
            newState = Object.assign({}, state, action.usersList);
            return newState;
        case userListType.UPDATE_USER_IN_LIST:
            newState = Object.assign({}, state, {[action.user.id]:action.user});
            return newState;
        default:
            return state;
    }
}
