import React from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {goTo} from "../actions/navigate";
import {HeaderBar} from "../components/headerBar";
import {Firebase} from "../api/firebase";
import {getMatchInfo} from "../actions/library";
import {Dialog} from "../components/dialog";
import {hideDialog, showCustomDialog} from "../actions/dialog";
import tools from "../api/tools";

export default class MatchsView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {home_score: '0', away_score: '0'}
        this.logo = require('../resources/icons/ic_query.png');//require('../resources/images/heymeetapplogo.png');
        this.background = require('../resources/images/background.png');
        let path = "/groups/a/matches";
        Firebase.track(path, null)
        this.screen = tools.getFixedScreenDimensions();
        this.userId = this.props.app.user.uid;
    }

    getMatchesList = () => {
        let matchesList = [];
        for (var key in this.props.app.matches) {
            matchesList.push(this.props.app.matches[key])
        }
        return matchesList
    }

    enabledBet = () => {
        return true
    }

    setHomeScore = (text, match) => {
        this.setState({home_score: text})
        this.bet(match, text, this.state.away_score)
    }

    setAwayScore = (text, match) => {
        this.setState({away_score: text})
        this.bet(match, this.state.home_score, text)
    }

    doBet = (match) => {
        let points = this.props.app.usersList[this.userId].points;
        if (points > 1) {
            Firebase.updateBed(this.userId, points, match, Number(this.state.home_score), Number(this.state.away_score))
        }
        this.props.navigation.dispatch(hideDialog())
    }

    bet = (match, home_score, away_score) => {
        this.props.navigation.dispatch(showCustomDialog(
            <Dialog hide={() => this.props.navigation.dispatch(hideDialog())}>
                <View
                    style={[
                        {
                            borderRadius: 10,
                            marginTop: dimens.normalGap,
                            padding: dimens.normalGap,
                            width: this.screen.width - 2 * dimens.normalGap,
                            backgroundColor: colors.white,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{flex: 1, aspectRatio: 1.5}}
                            source={{uri: this.props.app.teams[match.home_team].flag}}
                        />
                        <TextInput
                            style={[appStyle.subSection, {
                                flex: 1,
                                marginLeft: dimens.normalGap / 4,
                                color: colors.black,
                                textAlign: 'left'
                            }]}
                            onChangeText={(text) => this.setHomeScore(text, match)}
                            value={home_score}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            placeholder={'0'}
                            placeholderTextColor={colors.black}
                        />
                        <TextInput
                            style={[appStyle.subSection, {
                                flex: 1,
                                marginRight: dimens.normalGap / 4,
                                color: colors.black,
                                textAlign: 'right'
                            }]}
                            onChangeText={(text) => this.setAwayScore(text, match)}
                            value={away_score}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            placeholder={'0'}
                            placeholderTextColor={colors.black}
                        />
                        <Image
                            style={{flex: 1, aspectRatio: 1.5}}
                            source={{uri: this.props.app.teams[match.away_team].flag}}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.doBet(match)}
                        disabled={!this.enabledBet()}
                        style={[appStyle.buttons, {
                            backgroundColor: this.enabledBet() ? colors.darkGray : colors.darkGray
                        }]}
                    >
                        <Text
                            style={[
                                appStyle.subSection,
                                {
                                    color: colors.white
                                }
                            ]}
                        >
                            Apostar
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog>
        ))
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
                    renderItem={({item}) => <MatchCard match={item} app={this.props.app}
                                                       bet={() => this.bet(item, 0, 0)}/>}
                >

                </FlatList>
            </View>
        )
    }
}

class MatchCard extends React.Component {
    bet = () => {
        if(!this.props.match.finished) {
            this.props.bet && this.props.bet()
        }
    }

    getUserBetsNumbers = () => {
        let usersBets={
            home_team:0,
            away_team:0,
            both:0
        }
        for (var key in this.props.app.usersList) {
            let user = this.props.app.usersList[key];
            if (user[this.props.match.name]) {
                let matchBet = user[this.props.match.name]
                if(matchBet.home_score==matchBet.away_score){
                    usersBets.both +=1;
                }else {
                    if (matchBet.home_score > matchBet.away_score) {
                        usersBets.home_team += 1;
                    }
                    if (matchBet.home_score < matchBet.away_score) {
                        usersBets.away_team += 1;
                    }
                }
            }
        }
        return usersBets
    }

    render() {
        let stadium = this.props.app.stadiums[this.props.match.stadium];
        let usersBets = this.getUserBetsNumbers();
        return <TouchableOpacity
            onPress={this.bet}
            style={{
                alignItems: 'center',
                borderTopWidth: 1,
                borderColor: colors.black,
                paddingTop: dimens.normalGap / 4,
                backgroundColor: colors.darkGray
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{flex: 1, aspectRatio: 1.5}}
                    source={{uri: this.props.app.teams[this.props.match.home_team].flag}}
                />
                <Text
                    style={[appStyle.subSection, {
                        flex: 1,
                        marginLeft: dimens.normalGap / 4,
                        color: colors.white,
                        textAlign: 'left'
                    }]}
                >{this.props.app.teams[this.props.match.home_team].name}</Text>
                <Text
                    style={[appStyle.subSection, {
                        flex: 1,
                        marginRight: dimens.normalGap / 4,
                        color: colors.white,
                        textAlign: 'right'
                    }]}
                >{this.props.app.teams[this.props.match.away_team].name}</Text>
                <Image
                    style={{flex: 1, aspectRatio: 1.5}}
                    source={{uri: this.props.app.teams[this.props.match.away_team].flag}}
                />
            </View>
            <Text
                style={[appStyle.subSection, {
                    flex: 1,
                    marginTop: dimens.normalGap / 4,
                    color: this.props.match.finished?colors.orangrend:colors.white
                }]}
            >{this.props.match.finished?"Finalizado":this.props.match.date}</Text>
            <Text
                style={[appStyle.subSection, {
                    flex: 1,
                    marginTop: dimens.normalGap / 8,
                    marginBottom: dimens.normalGap / 4,
                    color: colors.white
                }]}
            >{stadium.name + ", " + stadium.city}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={[appStyle.subSection, {
                        flex: 1,
                        marginLeft: dimens.normalGap / 4,
                        color: colors.white,
                        textAlign: 'left'
                    }]}
                >Gana:{"\n" + usersBets.home_team}</Text>
                <Text
                    style={[appStyle.subSection, {
                        flex: 1,
                        marginLeft: dimens.normalGap / 4,
                        color: colors.white,
                        textAlign: 'center'
                    }]}
                >Empata:{"\n" + usersBets.both}</Text>
                <Text
                    style={[appStyle.subSection, {
                        flex: 1,
                        marginRight: dimens.normalGap / 4,
                        color: colors.white,
                        textAlign: 'right'
                    }]}
                >Gana:{"\n" + usersBets.away_team}</Text>
            </View>
        </TouchableOpacity>
    }
}

