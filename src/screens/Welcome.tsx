import React, {useState} from 'react';
import {observer, inject} from 'mobx-react';
import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {STYLES, COLORS} from '../theme';
import {Button} from './components';
import ExpenseStore from '../mobx/ExpenseStore';
import {TEXT} from '../assets/strings';

const Welcome = ({expenseStore}: {expenseStore: ExpenseStore}) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);
  const onPress = () => {
    if (userName) {
      expenseStore.login(userName);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <View style={styles.container}>
        <TextInput
          placeholder={TEXT.enterName}
          style={[styles.textInput, error && styles.redInput]}
          onFocus={() => {}}
          onChangeText={input => setUserName(input)}
          returnKeyType="done"
        />
      </View>
      <Button label={TEXT.login} onPress={onPress} />
    </SafeAreaView>
  );
};

export default inject('expenseStore')(observer(Welcome));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    alignSelf: 'center',
    borderColor: COLORS.purpleBorder,
    backgroundColor: COLORS.white,
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderWidth: 1,
    height: 50,
    padding: '1%',
    width: '70%',
  },
  redInput: {
    borderColor: COLORS.red,
    borderWidth: 2,
  },
});
