import {observable, action, makeObservable, computed} from 'mobx';
import {persist} from 'mobx-persist';
import Store from './Store';
import {ListEntry} from '../screens/types';

class ExpenseStore {
  @persist('object')
  @observable
  userName: string | null = '';

  @persist('object')
  @observable
  expenseList: ListEntry[] = [];

  @persist('object')
  @observable
  expensesAmount = 0;

  @persist('object')
  @observable
  modalVisible = false;

  constructor(store: Store) {
    makeObservable(this);
  }

  findExpense(title: string) {
    return this.expenseList.find(element => element.title === title);
  }

  @action createExpense(title: string, amount = 0, date: string) {
    // I didn't handle sorting the entries by date, but that would be something to handle here
    const existingDateEntry = this.findExpense(date);
    const dataEntry = {expenseName: title, amount};
    if (existingDateEntry) {
      existingDateEntry.data.push(dataEntry);
    } else {
      const newDateEntry = {
        title: date,
        data: [dataEntry],
      };
      this.expenseList.push(newDateEntry);
    }
    this.expensesAmount++;
  }

  @action removeExpense(title: string, index: number) {
    for (let i = 0; i < this.expenseList.length; i++) {
      if (this.expenseList[i].title === title) {
        this.expenseList[i].data.splice(index, 1);
        return;
      }
    }
    this.expensesAmount--;
  }

  @action editExpense(
    newTitle: string,
    newAmount: number,
    newDate: string,
    index: number,
    clickedItem: any,
  ) {
    const newExpense = {expenseName: newTitle, amount: +newAmount};
    if (newDate !== clickedItem.date) {
      this.removeExpense(clickedItem.date, index);
      this.createExpense(newTitle, newAmount, newDate);
    } else {
      for (let i = 0; i < this.expenseList.length; i++) {
        if (this.expenseList[i].title === newDate) {
          this.expenseList[i].data[index] = newExpense;
          return;
        }
      }
    }
  }

  @computed
  get expenseSum() {
    return this.expenseList.length
      ? this.expenseList.reduce(
          (overallSum, entryByDate) =>
            (overallSum += entryByDate.data.reduce(
              (sumByDate, expenseEntry) => (sumByDate += expenseEntry.amount),
              0,
            )),
          0,
        )
      : 0;
  }

  @action login(userName: string) {
    this.userName = userName;
  }

  @action signOut() {
    this.userName = null;
  }
}

export default ExpenseStore;
