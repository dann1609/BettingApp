import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {appStyle, colors, dimens} from "../components/styles/appStyle";
import {goTo} from "../actions/navigate";

export default class LandingView extends React.Component {

    constructor(props) {
        super(props)
        this.logo = null//require('../resources/images/heymeetapplogo.png');
        this.background = require('../resources/images/background.png');
    }

    render() {
        return (
            <View style={appStyle.viewContainer}>
                <ImageBackground
                    style={appStyle.viewCenterContainer}
                    source={this.background}
                    >
                    <Image
                        //source={this.logo}
                        style={{
                            marginBottom: dimens.normalGap
                        }}
                    />
                    <Text
                        style={[appStyle.section,
                            {
                                margin: dimens.normalGap,
                                paddingBottom: dimens.normalGap / 2,
                                textAlign: 'center'
                            }
                        ]}
                    >
                        Bienvenido a BettingSoccer. {"\n\n"}La aplicación para apostar por tus equipos favoritos del mundial.
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.dispatch(goTo('register'))}
                        style={[appStyle.buttons, {
                            backgroundColor: colors.white
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
                            Registrar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.dispatch(goTo('login'))}
                        style={[appStyle.buttons, {
                            backgroundColor: colors.white
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
                </ImageBackground>
            </View>
        )
    }
}

