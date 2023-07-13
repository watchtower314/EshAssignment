import React from 'react';
import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './App';
import stores from './src/mobx';
import {Provider} from 'mobx-react';
import {name as appName} from './app.json';

const MobX = () => (
  <SafeAreaProvider>
    {console.log('stores', stores)}
    <Provider {...stores}>
      <App />
    </Provider>
  </SafeAreaProvider>
);
AppRegistry.registerComponent(appName, () => MobX);
