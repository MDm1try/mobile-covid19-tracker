/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import { store } from './src/configure-store';
import { navigationRef } from './src/RootNavigation';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => (
    <Provider store={store}>
        <Root>
            <NavigationContainer ref={navigationRef}>
                <MainNavigator />
            </NavigationContainer>
        </Root>
    </Provider>
);

export default App;
