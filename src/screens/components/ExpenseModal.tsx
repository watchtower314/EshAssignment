import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import moment from 'moment';
import ExpenseStore from '../../mobx/ExpenseStore';
import {Button} from './Button';
import {LabelInput} from './LabelInput';
import {TEXT} from '../../assets/strings';

type ModalType = 'Create' | 'Edit';

export const ExpenseModal = ({
  isVisible,
  modalType,
  navigateToHome,
  onPress,
  clickedItem = null,
}: {
  clickedItem?: any;
  isVisible: boolean;
  modalType: ModalType;
  expenseStore: ExpenseStore;
  navigateToHome: () => void;
  onPress: (title: string, amount: string, date: string) => void;
}) => {
  const [title, setTitle] = useState(clickedItem?.expenseName || '');
  const [amount, setAmount] = useState(
    clickedItem?.amount ? `${clickedItem?.amount}` : '',
  );
  const [date, setDate] = useState(clickedItem?.date || '');

  // I really didn't want to use datePicker
  const handleDateInput = (input: string) => {
    let dateFormat = input;
    if (input.length === 8 && !input.includes('.')) {
      dateFormat = moment(input, 'DDMMYYYY').format('DD.MM.YYYY');
    }
    if (dateFormat === 'Invalid date') {
      console.log('tkt invalid dateFormat', dateFormat);
      Alert.alert(
        'Invalid Format',
        'Please enter date with the format DDMMYYYY',
      );
      dateFormat = '';
    }
    setDate(dateFormat);
  };

  const clear = () => {
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Modal
          animationType="slide"
          visible={isVisible}
          presentationStyle="formSheet"
          onRequestClose={() => {}}
          statusBarTranslucent={false}>
          <Pressable
            style={styles.modalContainer}
            onPress={() => Keyboard.dismiss()}>
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                onPress={() => navigateToHome()}>
                <Image
                  source={require('../../assets/images/cancel.png')}
                  resizeMode="contain"
                  tintColor={'black'}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.createForm}>
              <Text
                style={styles.titleText}>{`${modalType} ${TEXT.expense}`}</Text>
              <LabelInput
                label={TEXT.title}
                value={title}
                setValue={setTitle}
              />
              <LabelInput
                label={TEXT.amount}
                value={amount}
                setValue={setAmount}
                keyboardType="numeric"
              />
              <LabelInput
                label={TEXT.date}
                value={date}
                setValue={handleDateInput}
                keyboardType="number-pad"
                placeholder="01.07.2023"
              />
            </View>
            <Button
              label={modalType}
              onPress={() => {
                onPress(title, date, amount);
                clear();
              }}
            />
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

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
