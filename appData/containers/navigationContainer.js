import React, {Component} from 'react';
import {AppState, FlatList, NativeModules} from 'react-native';
import {connect} from 'react-redux';
import {AppNavigator} from '../config/navigators/appNavigator'
import {addNavigationHelpers} from 'react-navigation';
import {Text, TouchableOpacity, View} from "react-native";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {Dialog} from "../components/dialog";
import tools from "../api/tools";
import {hideDialog, showTestScreenDialog} from "../actions/dialog";
import {goTo} from "../actions/navigate";
import {Firebase} from "../api/firebase";

console.disableYellowBox = true;

const {StatusBarManager} = NativeModules;

if (require('react-native').Platform.OS === 'ios') {
    navbarPadding = 0;
} else {
    navbarPadding = StatusBarManager.HEIGHT;
    //console.log('status bar android: ' + StatusBarManager.HEIGHT)
}

if (require('react-native').Platform.OS === 'ios') {
    navbarOffset = 24;
    //console.log('status bar ios: ' + navbarOffset);
} else {
    navbarOffset = 0;

}

class NavigationView extends React.Component<> {

    constructor(props) {
        super(props)
        this.state = {
            appState: AppState.currentState
        }
        this.screen = tools.getFixedScreenDimensions();
        //console.log(navbarOffset);
        Firebase.initialize();
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            //this.props.dispatch(storeUser())
            //dev.log('App goes to the foreground!')
        }
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            //dev.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
    }

    showDialog = () => {
    }

    hideDialog = () => {
        this.props.dispatch(hideDialog())
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        //dev.log('app unmounted')
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    render() {
        this.screen = tools.getFixedScreenDimensions();
        this.dialog = <View/>;
        this.yNDialog = <View/>;
        this.customDialog = <View/>;


        if (this.props.app.dialog.dialogVisible) {
            this.dialog = <Dialog hide={this.hideDialog}>
                <View
                    style={[
                        {
                            borderRadius: 10,
                            marginTop: dimens.normalGap,
                            width: this.screen.width - 2 * dimens.normalGap,
                            backgroundColor: colors.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 1.3 * dimens.normalGap,
                        }
                    ]}
                >
                    <Text
                        style={[
                            appStyle.section,
                            {
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: colors.darkblue,
                                marginBottom: dimens.normalGap / 2,
                            }
                        ]}
                    >
                        {this.props.app.dialog.dialogTitle}
                    </Text>
                    <Text style={[appStyle.subSection, {marginTop: 10, marginBottom: 40, textAlign: 'center',}]}
                    >{this.props.app.dialog.dialogText}
                    </Text>
                </View>
            </Dialog>
        }

        if (this.props.app.dialog.yNDialogVisible) {
            this.yNDialog = <Dialog hide={this.hideDialog}>
                <View
                    style={[
                        {
                            borderRadius: 10,
                            marginTop: dimens.normalGap,
                            width: this.screen.width - 4 * dimens.normalGap,
                            backgroundColor: colors.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    ]}
                >
                    <Text
                        style={[
                            appStyle.section,
                            {
                                fontWeight: 'bold',
                                textAlign: 'center',
                                lineHeight: 18,
                                color: colors.darkblue,
                                marginBottom: dimens.normalGap / 2,
                                paddingLeft: 0.4 * dimens.normalGap,
                                paddingRight: 0.4 * dimens.normalGap,
                            }
                        ]}
                    >
                        {this.props.app.dialog.dialogTitle}
                    </Text>
                    <Text style={[
                        appStyle.miniSection,
                        {
                            marginTop: 10,
                            marginBottom: 0.5 * dimens.normalGap,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            lineHeight: 18,
                            paddingLeft: 0.4 * dimens.normalGap,
                            paddingRight: 0.4 * dimens.normalGap,
                        }
                    ]}
                    >{this.props.app.dialog.dialogText}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderTopWidth: 2,

                            borderColor: colors.ultraLightGray
                        }}
                    >
                        <TouchableOpacity
                            onPress={this.props.app.dialog.cancelAction}
                            style={{
                                flex: 1,
                                borderRightWidth: 1,
                                height: 2 * dimens.normalGap,
                                borderColor: colors.ultraLightGray,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={[
                                    appStyle.miniSection,
                                    {
                                        color: colors.lightGray
                                    }
                                ]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.app.dialog.acceptAction}
                            style={{
                                flex: 1,
                                borderLeftWidth: 1,
                                height: 2 * dimens.normalGap,
                                borderColor: colors.ultraLightGray,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={[
                                    appStyle.miniSection,
                                    {
                                        color: colors.orange
                                    }
                                ]}
                            >OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        }

        if (this.props.app.dialog.customDialogVisible) {
            this.dialog = this.props.app.dialog.customDialog
        }
        return (
            <View
                style={{flex: 1}}
            >
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}/>
                {this.yNDialog}
                {this.dialog}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    app: state,
    nav: state.nav
});

export default connect(mapStateToProps)(NavigationView);