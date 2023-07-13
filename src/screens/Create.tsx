import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react';
import ExpenseStore from '../mobx/ExpenseStore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {TEXT} from '../assets/strings';
import {ModalType} from './types';
import {ExpenseModal} from './components/ExpenseModal';

const Create = ({
  modalType = TEXT.create as ModalType,
  expenseStore,
}: {
  modalType: ModalType;
  expenseStore: ExpenseStore;
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isFocused);
  }, [isFocused]);

  const navigateToHome = () => {
    setShowModal(false);
    navigation.navigate('Home');
  };

  const createExpense = (title: string, date: string, amount: string) => {
    if (title && date) {
      expenseStore.createExpense(title, +amount, date);
      navigateToHome();
    }
  };

  return (
    <ExpenseModal
      isVisible={showModal}
      expenseStore={expenseStore}
      navigateToHome={navigateToHome}
      modalType={TEXT.create as ModalType}
      onPress={createExpense}
    />
  );
};

export default inject('expenseStore')(observer(Create));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  cancelButtonContainer: {
    padding: '3%',
  },
  cancelButton: {
    alignSelf: 'flex-end',
    width: '10%',
    aspectRatio: 1,
  },
  createForm: {
    flex: 0.9,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: 'pink',
    width: '90%',
  },
});
