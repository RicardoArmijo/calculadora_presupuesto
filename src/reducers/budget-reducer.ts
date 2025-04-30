import { category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid"

// Acciones
export type BudgetActions = 
{type: 'add-budget', payload : {budget:number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{type: 'add-expense', payload: {expense: DraftExpense} }| // no se pasa el id
{type: 'remove-expense', payload: {id: Expense['id']}} |
{type: 'get-expense-by-id', payload: {id: Expense['id']}} |
{type: 'update-expense', payload: {expense: Expense}}| // aqui se pasa el expense completo con id
{type: 'reset-app'} |// se agrega la accion para resetear la app
{type: 'add-filter-category', payload: {id:category['id']}} // se agrega la accion para filtrar por categoria

// Se define la estrucutra del estado
export type BudgetState = {  
    budget:number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id'] // vamos a tomar el gasto para editarlo con un luckup
    currentCategory: category['id'] // se agrega la categoria actual para filtrar
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget') // Intenta obtener el presupuesto guardado ('budget') del localStorage.
    return localStorageBudget ? +localStorageBudget : 0 // Si existe, lo convierte a número (por eso el +). Si no existe, devuelve 0 como presupuesto inicial.
}

const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses') // Intenta obtener los gastos guardados ('expenses') del localStorage.
    return localStorageExpenses ? JSON.parse(localStorageExpenses): [] // Si existen, los parsea desde JSON a un arreglo de objetos, Si no hay nada, devuelve un array vacío.
}

export const initialState : BudgetState = { // Se le declara como BudgetState para que este sincronizado
    budget: initialBudget(), // Estado inicial del presupuesto
    modal: false, // Esta inicial del modal oculto
    expense: localStorageExpenses(),
    editingId : '',
    currentCategory: '', // Se agrega la categoria actual para filtrar
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return{
        ...draftExpense,
        id: uuidv4() // Le anade un id y lo manda a addexpense
    }

}


export const budgetReducer = ( // Se deben colocar colocar el state y el action que vamos a utlizar para el autocompletado
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type ===  "add-budget"){
        return {
            ...state,
            budget: action.payload.budget // Actualiza el presupuesto con el valor de budget
        }

    }
    if (action.type === 'show-modal'){
        return{
            ...state,
            modal: true // Muestra el modal cambiandolo a true
        }
    }
    if (action.type === 'close-modal'){
        return{
            ...state,
            modal: false, // Oculta el modal cambiandolo a false
            editingId:''
        }
    }
    
    if (action.type === 'add-expense'){
        const expense = createExpense(action.payload.expense) // se pasa lo que hay en el payload a la fucion
        return{
            ...state,
            expense: [...state.expense, expense], // Agrega el nuevo gasto
            modal: false// oculta el form despues de agregar un parametro
        }
    }

    if(action.type === 'remove-expense'){
        return {
            ...state,
            expense: state.expense.filter(expense => expense.id !== action.payload.id) // Guarda en el expenses todos los datos diferentes al id que se trae del payload
        }
    }

    if(action.type === 'get-expense-by-id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal:true // cuando se dispare la accion se abre el modal
        }
    }

    if(action.type === 'update-expense'){
        return{
            ...state,
            expense: state.expense.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense), // Se busca el gasto que tiene el mismo id que viene en el payload
            //si el id coincide, se reemplaza por el nuevo gasto, sino, se deja el gasto original
            modal:false,
            editingId:''
        }
    }

    if(action.type === 'reset-app'){
        return {
            ...state,
            // Se reinicia el estado a su valor inicial
            budget: 0,
            expense: [],
            modal: false, // no necesario
            editingId: '', // no necesario
            localStorageExpenses: [], // Se limpia el localStorage de los gastos
            localStorageBudget: 0 // Se limpia el localStorage del presupuesto
        }
    }

    if(action.type === 'add-filter-category'){
        return {
            ...state,
            currentCategory: action.payload.id // Se guarda la categoria actual en el state
        }
    }
    

    return state 
}