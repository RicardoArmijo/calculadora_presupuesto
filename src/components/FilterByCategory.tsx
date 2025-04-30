import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  
    const { dispatch } = useBudget() // Extrae el dispatch de la context api

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type:'add-filter-category', payload:{id: e.target.value}}) // Se pasa el id del select al dispatch
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 mb-10">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
            <label htmlFor="category" className="text-gray-600 font-bold">Filtrar por Categoria</label>
            <select
                id="category"
                className="border-2 border-gray-300 rounded-lg p-2 flex-1 w-full md:w-auto"
                //onChange={e} para inferir el tipo de evento
                onChange={handleChange} // Se pasa el evento al handleChange
            >
                <option value="">-- Todas las categorias --</option>
                {/* Se mapean las categorias y se muestran en el select */}
                {categories.map(category => (
                    <option 
                        value={category.id}
                        key={category.id}
                    >
                        {category.name}
                    </option>
                
                ))} 
            </select>
            </div>
            </form>      
        </div>
  )
}
