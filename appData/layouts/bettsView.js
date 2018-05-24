import React from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {goTo} from "../actions/navigate";
import {HeaderBar} from "../components/headerBar";
import {Firebase} from "../api/firebase";
import {getBettsInfo, getMatchInfo} from "../actions/library";

export default class BettsView extends React.Component {

    constructor(props) {
        super(props)
        this.logo = require('../resources/icons/ic_query.png');//require('../resources/images/heymeetapplogo.png');
        this.background = require('../resources/images/background.png');
        //let path = "/groups/a/matches";
        //Firebase.track(path, null)
        this.props.navigation.dispatch(getBettsInfo())
    }

    getUsersList = () => {
        let usersList = [];
        for (var key in this.props.app.usersList) {
            usersList.push(this.props.app.usersList[key])
        }
        return usersList
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
                    data={this.getUsersList()}
                    renderItem={({item}) => <UserCard user={item} app={this.props.app}/>}
                >

                </FlatList>
            </View>
        )
    }
}

class UserCard extends React.Component {
    render() {
        return <View
            style={{
                alignItems: 'center',
                borderTopWidth: 1,
                flexDirection:'row',
                borderColor: colors.black,
                padding: dimens.normalGap / 4,
                backgroundColor: colors.darkGray
            }}>
            <Text
                style={[appStyle.subSection, {
                    flex: 1,
                    color: colors.white
                }]}
            >{this.props.user.name}</Text>
            <Text
                style={[appStyle.subSection, {
                    flex: 1,
                    color: colors.white
                }]}
            >{this.props.user.points}</Text>
        </View>
    }
}