import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";




export default function BudgetTracker() {

  // trae el state para usar el presupuesto con state.budget
  const { state, totalExpenses, remainingBudget, dispatch } = useBudget()


  // calcula el porcentaje de gasto para la grafica y con toFixed lo redondea a 2 decimales y con el + lo convierte a numero
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2) 
  console.log(totalExpenses)
  console.log(state.budget)
  console.log(percentage)
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
      {/* Se coloca el icono de la grafica y se le da el tamano con los valores que tenemos */}  
      <CircularProgressbar
          value={totalExpenses}
          maxValue={state.budget}
          text={`${percentage}% Gastado`}
          styles={buildStyles({
            textSize: '10px',
            pathColor: percentage === 100 ? '#DC2626' : '#3B82F6', // Color del cirulo, si se llena el 100% se pone rojo
            textColor: percentage === 100 ? '#DC2626' : '#3B82F6', // Color del texto, si se llena el 100% se pone rojo
            trailColor: '#F5F5F5'
          })}
        />
      </div>
      
      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          type="button"
          className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
          onClick={() => dispatch({type: 'reset-app'})} >
          RESETEAR APP
          

        </button>
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Disponible"
          amount={remainingBudget}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />

      </div>

    </div>
  )
}
