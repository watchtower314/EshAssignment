import Store from './Store';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

const store = new Store();

export default {
  ...store,
};
