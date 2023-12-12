

const currencyFormatter = new Intl.NumberFormat(navigator.language,{
    currency:'KZT',
    style:'currency'
})

export function currencyFormat(value:number){
    return currencyFormatter.format(value)
}