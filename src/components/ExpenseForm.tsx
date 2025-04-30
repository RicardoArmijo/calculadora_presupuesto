
import { categories } from '../data/categories'
import { DraftExpense, Value } from '../types';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'rc-picker/assets/index.css';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';


export default function ExpenseForm() {

  // Se crea usestate con generic de DraftExpense ya que no se le entregara el id como parametro  
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previusAmount, setPreviusAmount] = useState(0) // Se crea un state para guardar el valor anterior del amount
  const {dispatch, state, remainingBudget} = useBudget()

  useEffect (()=> {
        if(state.editingId){
            const editingExpense = state.expense.filter(currentExpense => currentExpense.id === state.editingId)[0] // trae con filter los datos del id de expense en la posicion 0
            setExpense(editingExpense)
            setPreviusAmount(editingExpense.amount) // Se setea el valor anterior del amount y queda guardado en el state
            setError('') // Se limpia el error al editar el gasto
        }  
  }, [state.editingId])



  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => { // Se toman los elementos del input y el select
        const {name, value} = e.target // no se puede agregar valueAsNumber por que los select no soportan ese tipo de propiedad
        const isAmountField = ['amount'].includes(name) // se fija si estamos escribiendo en amout
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value // si el campo es amount lo convierte en numero sino lo pasa normal
        })
  }

  // Se crea handlechange para el cambio de fecha
  // Especificar el tipo Value
  const handleChangeDate = (value : Value) => {
    setExpense({
        ...expense,
        date: value
    })
  }

  // Se crea handle change que valida todos los campos de los input
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // valida si hay algun campo que este vacio
    if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')// setea el error al state error
        return 
    }

    // Valida que no se supere el presupuesto
    if((expense.amount - previusAmount)  > remainingBudget){ //  resta el valor anterior del amount al nuevo amount y lo compara con el presupuesto restante
        setError('Gasto supera presupuesto')
        return 
    }

    if(expense.amount == 0){ //  valida que el presupuesto es mayor a 0
        setError('Gasto es igual a 0')
        return 
    }

    //Si editing id existe se envía como payload el gasto actualizado, incluyendo el id original del gasto que se estaba editando.
    if(state.editingId){
        dispatch({type: 'update-expense', payload:{expense:{id: state.editingId, ...expense}}})
    }else{
    //Agregar un nuevo gasto
        dispatch({type: 'add-expense', payload:{expense}})
    }


    // Reiniciar el state para vaciar el form
    setExpense ({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    setPreviusAmount(0) // Reinicia el valor anterior del amount a 0


  }



  return (
    // Se crea al formulario para ingresar los gastos
    <form className='space-y-5' onSubmit={handleSubmit}>
        <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
            {state.editingId ? 'Guardar Gasto' : 'Nuevo gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>} {/* se pasa de esta forma pero lo renderiza el componente*/}


        <div className='flex flex-col gap-2'>
            <label
            htmlFor='expenseName'
            >Nombre Gasto:</label>
            <input 
                type="text"
                id="expenseName"
                placeholder='Anade el nombre del gasto'
                className='bg-slate-100 p-2'
                name='expenseName'
                value={expense.expenseName} // Se pasa el name del useState de expense
                onChange={handleChange}
            />
        </div>

        <div className='flex flex-col gap-2'>
            <label
            htmlFor='amount'
            >Cantidad:</label>
            <input 
                type="number"
                id="amount"
                placeholder='Anade la cantidad del gasto'
                className='bg-slate-100 p-2'
                name='amount'
                value={expense.amount} // Se pasa el amount del useState de expense
                onChange={handleChange}
            />
        </div>

        <div className='flex flex-col gap-2'>
            <label
                htmlFor='category'
                className='text-xl'
            >Categoria:</label>
            <select 
                id="category"
                aria-placeholder="Anade la cantidad"
                className='bg-slate-100 p-2'
                name='category'
                value={expense.category} // Se pasa el category del useState de expense
                onChange={handleChange}
            >
            <option value="">-- Seleccione --</option>
            {categories.map (category => (
                <option
                    // Se recorre categories con categories.map, se crea la variable category que guarda la informacion y la asignamos a cada parametro
                    key={category.id}
                    value={category.id}
                >{category.name}</option>
            ))}
            </select>
        </div>
        
        <div className='flex flex-col gap-2'>
            <label
            htmlFor='date'
            className='text-xl'
            >Fecha Gasto:</label>
            <DatePicker 
                className="bg-slate-100 p-2 bprder-0"
                value={expense.date} // Se pasa el category del useState de expense
                onChange={handleChangeDate}
            />
        </div>

        <input
            type="submit"
            className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
            value={state.editingId ? 'Actualizar gasto' : 'Registrar gasto'}
        />

    </form>
  )
}
