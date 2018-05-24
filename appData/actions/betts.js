import {userListType} from "../reducers/usersListReducer";


export const setUserList = (usersList) => {
    return {
        type: userListType.SET_USERS_LIST,
        usersList
    }
}