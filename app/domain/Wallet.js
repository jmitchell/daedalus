// @flow
import { observable, action } from 'mobx';
import WalletTransaction from './WalletTransaction';

export type WalletType = 'personal' | 'shared';

export default class Wallet {

  id: string = '';
  type: WalletType;
  address: string = '';
  currency: string = '';
  @observable name: string = '';
  @observable amount: number;
  @observable transactions: Array<WalletTransaction> = [];

  constructor(data: {
    id: string,
    type: WalletType,
    name: string,
    address: string,
    currency: string,
    amount: number
  }) {
    Object.assign(this, data);
  }

  @action addTransaction(transaction: WalletTransaction) {
    this.transactions.push(transaction);
  }

}
