import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
  
  const { state } = useBudget()  // extraemos los gatos desde context api

  // Filtra los gatos por categoria si existe, si no existe muestra todos los gatos
  const filteredExpense = state.currentCategory ? state.expense.filter(expense => expense.category === state.currentCategory) : state.expense 
  
  // Valida con el state con los gatos no este vacio y lo actualiza con use memo cada vez que entre un nuevo gasto
  const isEmpty = useMemo(() => filteredExpense.length === 0, [filteredExpense]) 

  

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mb-10"> 
      {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gasto</p> :(
        <>
            <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos.</p>
            {filteredExpense.map( expense => (
                <ExpenseDetail
                    key={expense.id}
                    expense={expense}

                />
            ))}
        </>
      )}
    </div>
  )
}
