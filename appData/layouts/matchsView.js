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
                    renderItem={({item}) => <MatchCard match={item} app={this.props.app}/>}
                >

                </FlatList>
            </View>
        )
    }
}

class MatchCard extends React.Component {
    render() {
        let stadium = this.props.app.stadiums[this.props.match.stadium];
        return <View
            style={{
                alignItems:'center',
                borderTopWidth: 1,
                borderColor:colors.black,
                paddingTop:dimens.normalGap/4,
                backgroundColor:colors.darkGray}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems:'center'
                }}
            >
                <Image
                    style={{flex: 1, aspectRatio: 1.5}}
                    source={{uri: this.props.app.teams[this.props.match.home_team].flag}}
                />
                <Text
                    style={[appStyle.subSection,{
                        flex: 1,
                        marginLeft:dimens.normalGap/4,
                        color:colors.white,
                        textAlign:'left'
                    }]}
                >{this.props.app.teams[this.props.match.home_team].name}</Text>
                <Text
                    style={[appStyle.subSection,{
                        flex: 1,
                        marginRight:dimens.normalGap/4,
                        color:colors.white,
                        textAlign:'right'
                    }]}
                >{this.props.app.teams[this.props.match.away_team].name}</Text>
                <Image
                    style={{flex: 1, aspectRatio: 1.5}}
                    source={{uri:this.props.app.teams[this.props.match.away_team].flag}}
                />
            </View>
            <Text
                style={[appStyle.subSection,{
                    flex: 1,
                    marginTop:dimens.normalGap/4,
                    color:colors.white
                }]}
            >{this.props.match.date}</Text>
            <Text
                style={[appStyle.subSection,{
                    flex: 1,
                    marginTop:dimens.normalGap/8,
                    marginBottom:dimens.normalGap/4,
                    color:colors.white
                }]}
            >{stadium.name+", "+stadium.city}</Text>
        </View>
    }
}

