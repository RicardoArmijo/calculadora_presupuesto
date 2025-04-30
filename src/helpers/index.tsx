export function formatCurrency(amount:number){
    return new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP'}).format(amount)
}

// Funcion para formatear fecha desde un string
export function formatDate(dateStr:string) : string{
    const dateObj = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}