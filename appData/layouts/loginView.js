import React from 'react';
import {
    Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import {NavigationActions} from "react-navigation";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {HeaderBar} from "../components/headerBar";
import {goBackView, goTo} from "../actions/navigate";
import tools from "../api/tools";
import IconTextInput from "../components/iconTextInput";

export default class LoginView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {name: "", email: "", password: "", againPassword: "", passwordVisible: false}
        this.backIcon = require('../resources/icons/ic_query.png');//require('../resources/icons/ic_back.png');
        this.emailIcon = require('../resources/icons/ic_query.png');//require('../resources/icons/ic_mail.png');
        this.passwordIcon = require('../resources/icons/ic_query.png');//require('../resources/icons/ic_password.png');
        this.backPath = this.props.navigation.state.key;
        this.logo = require('../resources/icons/ic_query.png');//require('../resources/images/user.png');
        this.mNovisibleIcon = require('../resources/icons/ic_query.png');//require('../resources/icons/ic_novisible.png');
        this.mVisibleIcon = require('../resources/icons/ic_query.png');//require('../resources/icons/ic_visible.png');
    }

    goNext = () => {
        // this.props.navigation.dispatch(doLogin(this.state.email,this.state.password))
    }

    enabledToGoNext = () => {
        return this.validEmail() && this.validPassword("password") && this.validPassword("againPassword")
    }

    validEmail = () => {
        return tools.validateEmail(this.state.email)
    }

    validPassword = (password) => {
        return this.state[password].length > 5
    }

    validAgainPassword = () => {
        return this.state.password == this.state.againPassword && this.validPassword("againPassword")
    }

    toggleVisible = () => {
        this.setState(previousState => {
            return {passwordVisible: !previousState.passwordVisible};
        })
    }

    render() {
        this.screen = tools.getFixedScreenDimensions()
        return (
            <View style={[appStyle.viewContainer, {backgroundColor: colors.darkGray}]}>
                <HeaderBar
                    backgroundColor={colors.darkGray}
                    alignItems='flex-end'
                    leftIcon={this.backIcon}
                    leftAction={() => this.props.navigation.dispatch(goBackView(this.backPath))}
                />
                <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
                    <View
                        style={[appStyle.viewCenterContainer,
                            {
                                backgroundColor: colors.darkGray
                            }
                        ]}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                paddingBottom: dimens.normalGap
                            }}>
                            <Image
                                source={this.logo}
                                style={{}}
                            />
                            <Text
                                style={[appStyle.bigSection,
                                    {
                                        margin: dimens.normalGap,
                                        paddingBottom: dimens.normalGap / 4,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }
                                ]}
                            >
                                Inicia Sesion
                            </Text>
                            <IconTextInput
                                style={{
                                    marginLeft: dimens.normalGap,
                                    marginRight: dimens.normalGap,
                                    marginBottom: dimens.normalGap / 2
                                }}
                                inputStyle={[
                                    appStyle.subSection,
                                    {
                                        color: colors.white
                                    }
                                ]}
                                errorStyle={appStyle.miniSection}
                                placeholder='micorreo@compañia.com'
                                placeholderTextColor={colors.white80}
                                icon={this.emailIcon}
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                errorCondition={!this.validEmail() && this.state.email.length > 0}
                                errorMessage='enter a valid email'
                            />

                            <IconTextInput
                                style={{
                                    marginLeft: dimens.normalGap,
                                    marginRight: dimens.normalGap,
                                    marginBottom: dimens.normalGap / 2
                                }}
                                inputStyle={[
                                    appStyle.subSection,
                                    {
                                        color: colors.white
                                    }
                                ]}
                                errorStyle={appStyle.miniSection}
                                placeholder='contraseña'
                                placeholderTextColor={colors.white80}
                                icon={this.passwordIcon}
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry={!this.state.passwordVisible}
                                secondIcon={this.state.passwordVisible ? this.mVisibleIcon : this.mNovisibleIcon}
                                imageClick={() => this.toggleVisible()}
                                errorCondition={!this.validPassword("password") && this.state.password.length > 0}
                                errorMessage='6 charachters minimum'
                            />

                            <TouchableOpacity
                                onPress={() => this.goNext()}
                                disabled={!this.enabledToGoNext()}
                                style={[appStyle.buttons, {
                                    backgroundColor: this.enabledToGoNext() ? colors.white : colors.white80
                                }]}
                            >
                                <Text
                                    style={[
                                        appStyle.subSection,
                                        {
                                            color: colors.black
                                        }
                                    ]}
                                >
                                    Iniciar Sesion
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={[
                                    appStyle.miniSection,
                                    {
                                        marginTop: dimens.normalGap / 2,
                                        color: colors.white,
                                        textDecorationLine: 'underline'
                                    }
                                ]}
                            >
                                Olvidaste tu contraseña?
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
