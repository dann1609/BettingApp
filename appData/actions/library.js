import {Firebase} from "../api/firebase";
import {showDialog} from "./dialog";
import {saveUser} from "./user";
import {goTo} from "./navigate";
import {editMatch, setStadiums, setTeams} from "./matches";
import {setUserList, updateUserInList} from "./betts";

export function doRegister(name, email, password) {
    return function (dispatch, getState) {
        return Firebase.createUser(email, password)
            .then((responseData) => {
                if (responseData.error != undefined) {
                    throw responseData.error;
                } else {
                    //console.log('response is: ' + JSON.stringify(responseData));
                    return Firebase.setUserPropierties(name, responseData.user.uid)
                        .then(() => {
                            //console.log('set response is: ' + JSON.stringify(responseData))
                            dispatch(saveUser(responseData.user))
                            dispatch(goTo('main'))
                            dispatch(getBettsInfo())
                            dispatch(getMatchInfo())
                        });
                }
            })
            .catch((error) => {
                dispatch(showDialog('Error', error.message || error))
                return {error}
            })
    }
}

export function doLogin(email, password) {
    return function (dispatch, getState) {
        return Firebase.login(email, password)
            .then((responseData) => {
                if (responseData.error != undefined) {
                    throw responseData.error;
                }
                //console.log('response is: ' + JSON.stringify(responseData));


                if (responseData.user) {
                    dispatch(saveUser(responseData.user))
                    dispatch(goTo('main'))
                    dispatch(getBettsInfo())
                    dispatch(getMatchInfo())
                }
            })
            .catch((error) => {
                dispatch(showDialog('Error', error))
                return {error}
            })
    }
}

export function getMatchInfo() {
    return function (dispatch, getState) {
        let teamsPath = "/teams";
        return Firebase.getData(teamsPath)
            .then((responseData) => {
                //console.log('response is: ' + JSON.stringify(responseData));
                let teams = {}
                responseData.forEach(itemSnap => {
                    teams[itemSnap.val().id] = itemSnap.val()
                })
                dispatch(setTeams(teams));
                let stadiumsPath = "/stadiums";
                return Firebase.getData(stadiumsPath)
                    .then((responseData) => {
                        //console.log('response is: ' + JSON.stringify(responseData));
                        let stadiums = {}
                        responseData.forEach(itemSnap => {
                            stadiums[itemSnap.val().id] = itemSnap.val()
                        })
                        dispatch(setStadiums(stadiums));
                        let matchsPromise = getMatchsPromise({dispatch, getState})
                        return Promise.all(matchsPromise)
                    })
            })
    }
}

function getMatchsPromise({dispatch, getState}) {
    let matchsPromise = []
    let sources = ["a", "b", "c", "d", "e", "f", "g", "h"];
    sources.map((item) => {
        let matchPath = "/groups/" + item + "/matches";
        Firebase.track(matchPath, (itemSnap)=>trackMatchs(itemSnap,{dispatch, getState}))
        matchsPromise.push(
            Firebase.getData(matchPath)
                .then((responseData) => {
                    //console.log('response is: ' + JSON.stringify(responseData));
                    responseData.forEach(itemSnap => {
                        //console.log('key is: '+JSON.stringify(itemSnap));
                        dispatch(editMatch(itemSnap.val(), itemSnap.val().name))
                    })
                })
                .catch((error) => {
                    dispatch(showDialog('Error', error))
                    return {error}
                })
        )
    })
    return matchsPromise
}

export function getBettsInfo() {
    return function (dispatch, getState) {
        let usersPath = "/users";
        Firebase.track(usersPath, (itemSnap)=>trackUsers(itemSnap,{dispatch, getState}))
        return Firebase.getData(usersPath)
            .then((responseData) => {
                let usersList = {}
                responseData.forEach(itemSnap => {
                    usersList[itemSnap.val().id] = itemSnap.val()
                })
                dispatch(setUserList(usersList));
            })
    }
}

function trackUsers(itemSnap,{dispatch, getState}){
    //console.log('key is: '+JSON.stringify(itemSnap));
    dispatch(updateUserInList(itemSnap.val()))
}

function trackMatchs(itemSnap,{dispatch, getState}){
    //console.log('key is: '+JSON.stringify(itemSnap));
    dispatch(editMatch(itemSnap.val(), itemSnap.val().name))
}
