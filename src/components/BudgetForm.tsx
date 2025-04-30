import { useState, useMemo } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

  
  const [budget, setBudget] = useState(0)// Se definen state para trae la informacion que ingresa el usuario en el form  
  const { dispatch } = useBudget() // traemos las acciones de nuestro useBudget

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Se evento con su tipo donde se captura el valor del input
    //AsNumber es para que lo capture como numero    
    setBudget(e.target.valueAsNumber) // para traer el valor de budget donde se asigno handle Change
  }
  
  // Is validad retorna true, por lo cual cuando sea false corresponderia a un numero
  const isValidad = useMemo(() => {
    return isNaN(budget) || budget <= 0 // numero y mayor que 0
  },[budget])

  // Se crea handle submit para guardar el presupesto
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: 'add-budget', payload:{budget}})
    
  }

  // Se crea formulario
  return (
    // 
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                Definir Presupuesto
            </label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border bordget-gray-200 p-2"
                placeholder="Define tu presupesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>
        <input
            type="submit"
            value='Definir presupesto'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            disabled={isValidad} // con disables se debe usar un return en la funcion    
        />
            
    </form>
  )
}
