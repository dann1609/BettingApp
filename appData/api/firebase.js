import * as firebase from "firebase";

export class Firebase {
    static initialize() {
        firebase.initializeApp({
            apiKey: "AIzaSyC4nCZFZMWkS1-JrtF-PIaBvU8t7XvNvrs",
            authDomain: "bettingsoccer-un.firebaseapp.com",
            databaseURL: "https://bettingsoccer-un.firebaseio.com",
            projectId: "bettingsoccer-un",
            storageBucket: "bettingsoccer-un.appspot.com",
            messagingSenderId: "837794773493"
        });
    }

    static createUser(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                let responseData;
                try {
                    responseData = JSON.parse(JSON.stringify(response))
                }
                catch (e) {
                    responseData = {error: "Empty response"}
                }
                return responseData;
            })
            .catch((error) => {
                //dev.log('api error');
                //dev.error(error);
                return {
                    error: error.message
                }
            });
    }

    static setUserPropierties(name, userId) {
        let userMobilePath = "/users/" + userId;
        return firebase.database().ref(userMobilePath).set({
            points: 100,
            name: name,
            id:userId
        })
            .catch((error) => {
                //dev.log('api error');
                //dev.error(error);
                return {
                    error: error.message
                }
            });
    }

    static login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                let responseData;
                try {
                    responseData = JSON.parse(JSON.stringify(response))
                }
                catch (e) {
                    responseData = {error: "Empty response"}
                }
                return responseData;
            })
            .catch((error) => {
                //dev.log('api error');
                //dev.error(error);
                return {
                    error: error.message
                }
            });
    }
    static getData(path){
        return firebase.database().ref(path).once('value')
    }
    static track(path,action){
        return firebase.database().ref(path).on('child_changed',snap=>{
            console.log('snapchot: '+JSON.stringify(snap))
            action&&action(snap)
        })
    }

    static updateBed(userId,points,match,home_score,away_score) {
        let userMobilePath = "/users/" + userId;
        return firebase.database().ref(userMobilePath).update({
            points: points-2,
            [match.name]:{home_score,away_score}
        })
            .catch((error) => {
                //dev.log('api error');
                //dev.error(error);
                return {
                    error: error.message
                }
            });
    }
}