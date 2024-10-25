import { WalletType } from "./Wallet";

export type ExpenseCategory =
    | 'Entretenimiento'
    | 'Comida'
    | 'Transporte'
    | 'Salud'
    | 'Educación'
    | 'Vivienda'
    | 'Compras'
    | 'Deportes'
    | 'Viajes'
    | 'Facturas'
    | 'Acciones'
    | 'Moneda Extranjera'
    | 'Cedears'
    | 'Regalos'
    | 'Otros';


export const expenseCategories: { type: WalletType; categories: ExpenseCategory[] }[] = [

    {
        type: "DEBIT",
        categories: [
            'Entretenimiento',
            'Comida',
            'Transporte',
            'Regalos',
            'Salud',
            'Educación',
            'Vivienda',
            'Compras',
            'Deportes',
            'Viajes',
            'Facturas',
            'Otros'
        ]
    },
    {
        type: "CREDIT",
        categories: [
            'Entretenimiento',
            'Comida',
            'Transporte',
            'Regalos',
            'Salud',
            'Educación',
            'Vivienda',
            'Compras',
            'Deportes',
            'Viajes',
            'Facturas',
            'Otros'
        ]
    },
    {
        type: "INVESTMENT",
        categories: [
            'Acciones',
            'Moneda Extranjera',
            'Cedears'
        ]
    }
];