import React from 'react';
import {observer, inject} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import ExpenseStore from '../mobx/ExpenseStore';
import PreAuthNavigator from './PreAuth';
import PostAuthNavigator from './PostAuth';

const AppNavigator = ({expenseStore}: {expenseStore: ExpenseStore}) => (
  <NavigationContainer>
    {expenseStore.userName ? (
      <PostAuthNavigator expenseStore={expenseStore} />
    ) : (
      <PreAuthNavigator />
    )}
  </NavigationContainer>
);

export default inject('expenseStore')(observer(AppNavigator));
