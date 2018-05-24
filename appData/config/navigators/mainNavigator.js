import React from "react";
import {Image} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import {goTo} from "../../actions/navigate";
import matchsContainer from "../../containers/matchsContainer";
import bettsContainer from "../../containers/bettsContainer";


export const MainNavigator = TabNavigator({
    match: {
        screen: matchsContainer,
        navigationOptions: ({navigation}) => {
            return tabBarOptions('Partidos', require('../../resources/icons/ic_query.png'),()=>{
                navigation.dispatch(goTo('match'))
                //navigation.dispatch(resetTab(0,[{route:'homeDefault'}],'HomeNavigator'))
            })
        }
    },
    bets: {
        screen: bettsContainer,
        navigationOptions: ({navigation}) => {
            return tabBarOptions('Apuestas', require('../../resources/icons/ic_query.png'),()=>{
                navigation.dispatch(goTo('bets'))
                //navigation.dispatch(resetTab(0,[{route:'practiceDefault'}],'PracticeNavigator'))
            })


        }
    }
}, {
    swipeEnabled: 'false',
    tabBarOptions: {
        activeTintColor: '#ea8038',
        labelStyle: {
            paddingBottom: 5,
        },
    },
});

export function tabBarOptions(title, resource,action) {
    return {
        tabBarLabel: title,
        tabBarIcon: ({tintColor}) => {
            return <Image
                resizeMode='contain'
                source={resource}
                style={{width: 30, height: 30, tintColor: tintColor}}
            />
        },
        tabBarOnPress:()=> {
            action();
        }
    }
}

