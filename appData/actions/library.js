import {Firebase} from "../api/firebase";
import {showDialog} from "./dialog";
import {saveUser} from "./user";
import {goTo} from "./navigate";
import {editMatch} from "./matches";

export function doRegister(name, email, password) {
    return function (dispatch, getState) {
        return Firebase.createUser(email, password)
            .then((responseData) => {
                if (responseData.error != undefined) {
                    throw responseData.error;
                } else {
                    return Firebase.setUserPropierties(name, responseData.user.uid)
                        .then((responseData) => {
                            console.log('set response is: '+JSON.stringify(responseData))
                            if (responseData.error != undefined) {
                                throw responseData.error;
                            }
                        });
                }
                console.log('response is: ' + JSON.stringify(responseData));

                                if(responseData.user){
                                    dispatch(saveUser(responseData.user))
                                    dispatch(goTo('main'))
                                }
                /*

                                                if(library.checkErrorMessage(responseData)){
                                                    dispatch(showDialog('Error',library.checkErrorMessage(responseData)))
                                                }
                                                */

            })
            .catch((error) => {
                dispatch(showDialog('Error', error.message||error))
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
                console.log('response is: ' + JSON.stringify(responseData));


                if (responseData.user) {
                    dispatch(saveUser(responseData.user))
                    dispatch(goTo('main'))
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
        return Firebase.getData(teamsPath).then((responseData)=>{
            console.log('response is: ' + JSON.stringify(responseData));
        let matchsPromise = getMatchsPromise({dispatch, getState})
        return Promise.all( matchsPromise)
        })
    }
}

function getMatchsPromise({dispatch, getState}){
    let matchsPromise=[]
    let sources=["a","b","c","d","e","f","g","h"];
    sources.map((item)=>{
        let path = "/groups/"+item+"/matches";
        matchsPromise.push(
            Firebase.getData(path)
                .then((responseData) => {
                    //console.log('response is: ' + JSON.stringify(responseData));
                    responseData.forEach(itemSnap => {
                        //console.log('key is: '+JSON.stringify(itemSnap));
                        dispatch(editMatch(itemSnap.val(),itemSnap.val().name))
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
