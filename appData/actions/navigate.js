/**
 * React Native App
 * Made by Daniel Padilla
 */


import {NavigationActions} from "react-navigation";

export function goBackView(key) {
    return NavigationActions.back({
        key: key
    })
}

export function goTo(route,params, key){
    return (dispatch,getState)=>{
        //dev.log('route: '+route+' params: '+JSON.stringify(params));
        dispatch(
            NavigationActions.navigate(
                {
                    routeName: route,
                    params: params
                }
            )
        )
    }
}

export function resetNavigation(index,actions,key){
    return (dispatch,getState)=>{
        //dev.log('route: '+route+' params: '+JSON.stringify(params));
        let mKey = getKeyByName(getState().nav,key);
        //dev.log('key: '+mKey)
        dispatch(
            NavigationActions.reset({
                index: index,
                actions: actions.map((action)=>{
                    return NavigationActions.navigate({
                        routeName: action.route,
                        params: action.params
                    })
                }),
                key: mKey
            })
        )
    }
}

export function getKeyByName(navReducer,name) {
    for (i = navReducer.routes.length - 1; i >= 0; i--) {
        //dev.log('navreducer: '+JSON.stringify(navReducer));
        //dev.log('iterator: '+i);
        //dev.log('name: '+name);
        if (navReducer.routes[i].routeName == name) {
            return navReducer.routes[i].key
        }
    }
    return name;
}