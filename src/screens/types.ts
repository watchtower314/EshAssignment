export type ModalType = 'Create' | 'Edit';
export type ExpenseEntry = {expenseName: string; amount: number};
export type ListEntry = {title: string; data: ExpenseEntry[]};
