import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"
import { Expense } from "../types"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}
// Se crea type para budgetProvider
type BudgetProviderProps = {
    children: ReactNode
}

// Context es La accion de tener el estado global
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps) //<BudgetContextProps> los conecta

// Se declara provider de donde obtendremos la informacion de nuestro useReducer
export const BudgetProvider = ({children} : BudgetProviderProps) => { // se agrega children para poder utilizarlo en otros componentes

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    // con use memo cada vez que se actualice state expense, se suma al total
    const totalExpenses = useMemo(() => state.expense.reduce((total, expense) => expense.amount + total, 0), [state.expense]) // Entra el total de los gastado
    const remainingBudget = state.budget - totalExpenses // resta el total al state.budget
    

    return (
        // Dentro podemos tener acceso al state al dispach, 
        <BudgetContext.Provider
            //value siempre es un objeto y es donde se le pasan los parametros a context
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}>
            {children}
        </BudgetContext.Provider>
        
    )

}