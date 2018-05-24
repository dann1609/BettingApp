import React from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors, dimens} from "./styles/appStyle";

export default class IconTextInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {width: 0, height: 0, x: 0, y: 0};
    }

    onPageLayout = (event) => {
        const {x, y} = event.nativeEvent.layout;
        this.setState({x, y})
    };

    imageClick = () => {
        this.props.imageClick && this.props.imageClick()
    }

    onErrorLayout = (event) => {
        const {width, height} = event.nativeEvent.layout;
        this.setState({height})
    };

    render() {
        return (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        paddingBottom: 5,
                        borderBottomWidth: 2,
                        borderColor: colors.white
                    }
                    , this.props.style]}
            >
                <Image
                    style={{
                        height: '100%',
                        aspectRatio: 1
                    }}
                    resizeMode='contain'
                    source={this.props.icon}
                />
                <TextInput
                    onLayout={this.onPageLayout}
                    style={[
                        {
                            marginLeft: 15,
                            flex: 1
                        },
                        this.props.inputStyle]}
                    autoCorrect={false}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                >

                </TextInput>
                {this.props.secondIcon &&
                <TouchableOpacity
                    onPress={this.imageClick}
                >
                    <Image
                        onPress={() => this.imageClick()}
                        style={{
                            height: dimens.normalGap / 2,
                            aspectRatio: 1,
                            tintColor: colors.white80
                        }}
                        resizeMode='contain'
                        source={this.props.secondIcon}/>
                </TouchableOpacity>
                }
                {this.props.errorCondition &&
                <Text
                    onLayout={this.onErrorLayout}
                    style={[{
                        position: 'absolute',
                        bottom: -this.state.height - 5,
                        left: this.state.x,
                        backgroundColor:colors.white,
                        color: '#ff0000'
                    }, this.props.errorStyle]}>
                    *{this.props.errorMessage}
                </Text>
                }
            </View>
        )
    }
}