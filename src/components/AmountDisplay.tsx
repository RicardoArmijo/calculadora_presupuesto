import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string // Al colocar el sigo de interrogacion se declara como opcional
    amount: number
}

// En la siguiente funcion solo se muestra el label en caso de que exista
export default function AmountDisplay({label, amount}: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `} 
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
