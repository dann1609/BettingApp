import { matchesType} from "../reducers/matchesReducer";
import {teamsType} from "../reducers/teamsReducer";
import {stadiumsType} from "../reducers/stadiumsReducer";

export const editMatch = (match,matchRef) => {
    return {
        type: matchesType.EDIT_MATCH,
        match,
        matchRef
    }
}

export const setTeams = (teams) => {
    return {
        type: teamsType.SET_TEAMS,
        teams
    }
}

export const setStadiums = (stadiums) => {
    return {
        type: stadiumsType.SET_STADIUMS,
        stadiums
    }
}