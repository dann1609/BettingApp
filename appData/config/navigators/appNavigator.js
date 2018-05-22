/**
 * React Native App
 * Made by Daniel Padilla
 */

import {StackNavigator, NavigationActions} from 'react-navigation';
import landingContainer from "../../containers/landingContainer";

export const AppNavigator = StackNavigator({
    landing: {screen: landingContainer, navigationOptions: {header: null}},
});

export const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('landing'));
