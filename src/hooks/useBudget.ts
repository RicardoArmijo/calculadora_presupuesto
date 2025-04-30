import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

// Se crea hook para no estar utilizando useContext en todos los componentes donde queremos utilizar budgetcontext
export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error ('Debe rodear la aplicacion mediante el budgetProvider para utilizar el custom hook')
    }
    return context
}