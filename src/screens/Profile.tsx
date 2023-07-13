import React from 'react';
import {observer, inject} from 'mobx-react';
import {View, Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import {STYLES} from '../theme/layout';
import ExpenseStore from '../mobx/ExpenseStore';
import {LineSeparator} from './components';
import {TEXT} from '../assets/strings';

const TextLine = ({text, value}: {text: string; value?: number}) => (
  <View style={styles.textLineContainer}>
    <View style={styles.textRow}>
      <Text style={styles.textLine}>{text}</Text>
      <Text style={[styles.textLine, styles.amountText]}>{value}</Text>
    </View>
    <LineSeparator />
  </View>
);

const Profile = ({expenseStore}: {expenseStore: ExpenseStore}) => {
  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <View style={styles.container}>
        <TextLine
          text={TEXT.totalExpensesItems}
          value={expenseStore.expensesAmount}
        />
        <Pressable onPress={() => expenseStore.signOut()}>
          <TextLine text={TEXT.signOut} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default inject('expenseStore')(observer(Profile));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textLine: {
    fontSize: 18,
    marginBottom: '3%',
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textLineContainer: {
    height: 70,
  },
  textRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
