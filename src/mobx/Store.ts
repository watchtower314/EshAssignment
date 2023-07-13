import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'mobx-persist';
import ExpenseStore from './ExpenseStore';
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export default class Store {
  expenseStore: ExpenseStore;

  constructor() {
    this.expenseStore = new ExpenseStore(this);
    Promise.all([hydrate('expenseStore', this.expenseStore)]);
  }
}
