import React from 'react';
import store from "./appData/config/store";
import {Provider} from 'react-redux';
import NavigationView from './appData/containers/navigationContainer';

export default class App extends React.Component {
    render() {
        return (
            <Provider
                store={store}
            >
                <NavigationView/>
            </Provider>
        );
    }
}

