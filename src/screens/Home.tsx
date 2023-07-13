import React, {useState} from 'react';
import {observer, inject} from 'mobx-react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import ExpenseStore from '../mobx/ExpenseStore';
import {STYLES} from '../theme/layout';
import {LineSeparator} from './components';
import {TEXT} from '../assets/strings';
import {COLORS} from '../theme';
import {ExpenseModal} from './components';
import {ModalType} from './types';
import {ExpenseEntry} from './types';

const TableLine = ({
  label,
  value,
  style = {},
  textStyle = {},
}: {
  label: string;
  value: string;
  style?: object;
  textStyle?: object;
}) => (
  <View style={[styles.tableLine, style]}>
    <Text style={[styles.text, textStyle]}>{label}</Text>
    <Text style={styles.numeric}>{value}</Text>
  </View>
);

const Home = ({expenseStore}: {expenseStore: ExpenseStore}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [clickedItem, setClickedItem] = useState<any>(null); // temporariliy doing 'any'
  const [clickedIndex, setClickedIndex] = useState<any>(null);

  const handleShowEdit = (item: ExpenseEntry, index: number, date: string) => {
    setShowEdit(true);
    setClickedIndex(index);
    setClickedItem({...item, date});
  };

  const editExpense = (title: string, date: string, amount: string) => {
    // // ideally there would be a check if nothing changes, then don't call edit
    if (title && date) {
      expenseStore.editExpense(title, +amount, date, clickedIndex, clickedItem);
      setShowEdit(false);
    }
  };

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <View style={styles.container}>
        <TableLine
          label={`${TEXT.totalExpenses}:`}
          value={`$${expenseStore.expenseSum}`}
          style={styles.titleLine}
          textStyle={styles.boldText}
        />
        <SectionList
          sections={expenseStore.expenseList}
          keyExtractor={(item, index) => `${item}${index}`}
          renderItem={({item, index, section}) => (
            <TouchableOpacity
              onPress={() => handleShowEdit(item, index, section.title)}>
              <TableLine label={item.expenseName} value={`$${item.amount}`} />
              <LineSeparator />
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
      {showEdit && (
        <ExpenseModal
          isVisible={showEdit}
          expenseStore={expenseStore}
          navigateToHome={() => setShowEdit(false)}
          modalType={TEXT.edit as ModalType}
          clickedItem={clickedItem}
          onPress={editExpense}
        />
      )}
    </SafeAreaView>
  );
};

export default inject('expenseStore')(observer(Home));

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleLine: {
    width: '60%',
  },
  tableLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  numeric: {
    fontSize: 20,
  },
  header: {
    fontSize: 14,
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    backgroundColor: COLORS.titleColor,
  },
  title: {
    fontSize: 24,
  },
});
