export type Expense = {
    id: string
    expenseName: string // nombre del gatos
    amount: number
    category: string
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'> // gasto temporal

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];


export type category = {
    id:string
    name: string
    icon: string
}