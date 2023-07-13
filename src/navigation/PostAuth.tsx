import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Create from '../screens/Create';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExpenseStore from '../mobx/ExpenseStore';
import {COLORS} from '../theme';
const Tab = createBottomTabNavigator();

const PostAuthNavigator = ({expenseStore}: {expenseStore: ExpenseStore}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitle: expenseStore.userName,
        tabBarIcon: () => {
          if (route.name === 'Create') {
            return (
              <View style={styles.createContainer}>
                <Image
                  source={require('../assets/images/plus.png')}
                  resizeMode="contain"
                  tintColor={'white'}
                  style={{height: '50%', width: '50%'}}
                />
              </View>
            );
          }
        },
        tabBarLabelStyle: {
          fontSize: 18,
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: COLORS.gray,
      })}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen
        name={'Create'}
        component={Create}
        options={{
          header: () => null,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          header: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default observer(PostAuthNavigator);

const styles = StyleSheet.create({
  createContainer: {
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  tabBarStyle: {
    borderWidth: 2,
    height: '10%',
    width: '100%',
    justifyContent: 'center',
  },
});
