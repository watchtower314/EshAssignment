import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/Welcome';

const PreAuthNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <Screen name="Welcome" component={Welcome} />
    </Navigator>
  );
};
export default PreAuthNavigator;
