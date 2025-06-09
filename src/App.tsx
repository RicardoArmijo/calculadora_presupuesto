import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseList from "./components/ExpenseList"
import ExpenseModal from "./components/ExpenseModal"
import FilterByCategory from "./components/FilterByCategory"
import { useBudget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react"

function App() {

  // Se crear variable context para tener acceso a las variables globales creadas en budget que seria el state y dispatch
  //const context = useContext(BudgetContext)
  const { state } = useBudget()
  // Validar que el budget es mayor que 0
  const isValidBudget = useMemo(() => state.budget > 0,[state.budget])

  //Se ejecuta cada vez que state cambia
  //Guarda el presupuesto y los gastos actuales en localStorage
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expense))
  },[state])
  

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos y Git Hub
        </h1>
      </header>
      {/* Se utilizara un terniario en isValidBudget para que oculte el componente y se muestre el tracker una vez se ingrese el presupuesto*/}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
           {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      
      </div>

      {isValidBudget &&(
      <main className="max-w-3xl mx-auto py-10">  
        <FilterByCategory />
        <ExpenseList />
        <ExpenseModal />
        </main>  
      )}
    </>
  )
}

export default App
 
