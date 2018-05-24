import { matchesType} from "../reducers/matchesReducer";

export const editMatch = (match,matchRef) => {
    return {
        type: matchesType.EDIT_MATCH,
        match,
        matchRef
    }
}