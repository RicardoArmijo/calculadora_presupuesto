//import { ReactNode } from "react"
import { PropsWithChildren } from "react"
//type ErrorMessageProps = {
//    children: ReactNode // Permite renderizar string y componentes dentro de otros componente
//}



export default function ErrorMessage({children} : PropsWithChildren) {
  return (
        <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>
            {children}
        </p>

    
  )
}
