

export const userType = {
    SAVE_USER: 'SAVE_USER',
    RESET_USER: 'RESET_USER',
    HYDRATE_USER: 'HYDRATE_USER'
};


export const user = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case userType.SAVE_USER:
            newState = Object.assign({}, state, action.user);
            return newState;
        case userType.RESET_USER:
            return {}
        case userType.HYDRATE_USER:
            return Object.assign({}, action.restored);
        default:
            return state;
    }
}
