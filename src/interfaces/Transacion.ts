export interface Transaction {
    id?: string;
    date: any;
    category: string;
    amount: number;
    currency: "ARS"|"US";
    type: "INCOME"|"EXPENSE",
    description?: string;
    quote?: {
        blue: number;
        oficial: number;
    }
    credit?: {
        amount: number;
        installments: number;
        expired: any;
    }
}