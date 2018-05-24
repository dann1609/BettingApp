import {userType} from "../reducers/userReducer";

export const saveUser = (user) => {
    return {
        type: userType.SAVE_USER,
        user
    }
}