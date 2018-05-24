import React from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {goTo} from "../actions/navigate";
import {HeaderBar} from "../components/headerBar";
import {Firebase} from "../api/firebase";
import {getMatchInfo} from "../actions/library";

export default class MatchsView extends React.Component {

    constructor(props) {
        super(props)
        this.logo = require('../resources/icons/ic_query.png');//require('../resources/images/heymeetapplogo.png');
        this.background = require('../resources/images/background.png');
        let path = "/groups/a/matches";
        Firebase.track(path, null)
        this.props.navigation.dispatch(getMatchInfo())
    }

    getMatchesList = () => {
        let matchesList = [];
        for (var key in this.props.app.matches) {
            matchesList.push(this.props.app.matches[key])
        }
        return matchesList
    }

    render() {
        return (
            <View style={appStyle.viewContainer}>
                <HeaderBar
                    bigIcon
                    backgroundColor={colors.ultraLightGray}
                    alignItems='flex-end'
                    leftIcon={this.logo}
                    leftAction={() => this.props.navigation.dispatch(goTo('editProfile'))}
                    rightIcon={this.logo}
                    rightAction={() => this.props.navigation.dispatch(goTo('messages'))}
                />
                <FlatList
                    style={{flex: 1}}
                    data={this.getMatchesList()}
                    renderItem={({item}) => <MatchCard match={item}/>}
                >

                </FlatList>
            </View>
        )
    }
}

class MatchCard extends React.Component{
    render(){
        return <View
        style={{borderWidth:1}}>
            <Text>{this.props.match.name}</Text>
        </View>
    }
}

