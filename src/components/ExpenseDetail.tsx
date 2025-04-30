import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailProps = {
    expense : Expense // se infiere que es de tipo expense desde ExpenseList
}


export default function ExpenseDetail({expense} : ExpenseDetailProps) {
  
  // trae las acciones todo lo de nuestra context api e importamos el dispatch
  const {dispatch} = useBudget()
  
  // Usamos el useMemo para solo actualizar cuando se elimine la categoria que extraemos con el id
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  // funcion que permite actualizar cuando arrastramos, donde se crea un componente
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'get-expense-by-id',payload:{id:expense.id}})}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>

  )
  // funcion que permite eliminar cuando arrastramos, donde se crea un componente
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'remove-expense', payload: {id:expense.id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>

  )

  return (
    <SwipeableList>
      <SwipeableListItem
        // se pasan parametros del swipe
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>
                <img
                  // Se coloca el icono 
                  src={`/icono_${categoryInfo.icon}.svg`}
                  alt="icono gasto"
                  className="w-20"
                />
            </div>
            <div className="flex-1 space-y-2">
                <p>{/* Muestra el nombre de la categoria en base al id de esta que se obtiene de categoryInfo */}</p>
                <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p> 
                <p>{/* Abajo se pasa la fecha con un .tostring a nuestro helper formatDate para que formate la fecha*/}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString() )}</p>
            </div>

            <AmountDisplay
                amount={expense.amount}
            />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
