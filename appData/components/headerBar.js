

import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Button, TouchableHighlight} from 'react-native';
import {NavigationActions, DrawerNavigator, DrawerItems} from 'react-navigation';
import {appStyle, colors} from './styles/appStyle';

//import dev from "../api/log";

export class HeaderBar extends React.Component {

    getBackgroundColor = () => {
        if (typeof this.props.backgroundColor != "undefined") {
            return this.props.backgroundColor;
        } else {
            return '#fff';
        }
    };

    getAlignItems = () => {
        return this.props.alignItems ? this.props.alignItems : 'center';
    };

    getPadding = () => {
        return this.props.padding ? this.props.padding : 0;
    }

    render() {
        //dev.log('headerbar rendered');
        return (
            <View style={
                [
                    this.props.style,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: this.getAlignItems(),
                        height: 60 + navbarPadding,
                        padding: this.getPadding(),
                        backgroundColor: this.getBackgroundColor()
                    }
                ]
            }>
                <TouchableHighlight
                    onPress={this.props.leftAction}
                    underlayColor={'#00000000'}
                >
                    <Image
                        style={[
                            this.props.bigIcon ? appStyle.bigIcon : appStyle.icon,
                            {
                                marginLeft: 10,
                                tintColor: this.props.tintColor
                            }
                        ]}
                        source={this.props.leftIcon}
                        resizeMode='contain'/>
                </TouchableHighlight>
                <View
                    style={{flex: 1}}>
                    <Text
                        style={{
                            fontSize: 11,
                            color: colors.lightGray,
                            textAlign: 'center'
                        }}
                    >
                        {this.props.upperTitle}
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: '600',
                        color: colors.darkGray,
                        textAlign: 'center'
                    }}>{this.props.title}</Text>
                </View>
                <TouchableHighlight
                    onPress={this.props.rightAction}
                    underlayColor={'#00000000'}>
                    <Image
                        style={[
                            this.props.bigIcon ? appStyle.bigIcon : appStyle.icon,
                            {
                                marginRight: 10,
                                tintColor: this.props.tintColor
                            }
                        ]}
                        source={this.props.rightIcon}
                        resizeMode='contain'/>
                </TouchableHighlight>
            </View>
        );
    }
}
