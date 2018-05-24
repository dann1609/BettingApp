import {userListType} from "../reducers/usersListReducer";


export const setUserList = (usersList) => {
    return {
        type: userListType.SET_USERS_LIST,
        usersList
    }
}

export const updateUserInList = (user) => {
    return {
        type: userListType.UPDATE_USER_IN_LIST,
        user
    }
}