

import {StackNavigator, NavigationActions} from 'react-navigation';
import landingContainer from "../../containers/landingContainer";
import registerContainer from "../../containers/registerContainer";
import loginContainer from "../../containers/loginContainer";
import {MainNavigator} from './mainNavigator'

export const AppNavigator = StackNavigator({
    landing: {screen: landingContainer, navigationOptions: {header: null}},
    register: {screen: registerContainer, navigationOptions: {header: null}},
    login: {screen: loginContainer, navigationOptions: {header: null}},
    main: {screen: MainNavigator, navigationOptions: {header: null}},
});

export const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('landing'));
