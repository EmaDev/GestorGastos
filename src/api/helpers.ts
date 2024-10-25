import { Transaction } from "../interfaces/Transacion";

export const getTransactionByMonth = (currentDate: Date = new Date(), trasactions: Transaction[]) => {

    let amount: number = 0;
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59);

    const filtered_trasactions = trasactions.filter((transaction: any) => {
        const transactionDate = transaction.date.toDate();
        if (transactionDate >= startOfMonth && transactionDate <= endOfMonth) {
            if (transaction.type === "EXPENSE") {
                amount -= transaction.amount;
            } else {
                amount += transaction.amount;
            }
            return true;
        }
    });

    return {
        amount,
        transactions: filtered_trasactions
    }
}

export const getCreditTransactionByMonth = (currentDate: Date = new Date(), trasactions: Transaction[]) => {
    let amount: number = 0;
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    //const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59);

    const filtered_trasactions = trasactions.filter((transaction: any) => {
        const transactionDate = transaction.credit.expired.toDate();

        if (transactionDate >= startOfMonth) {
                const partialAmount = transaction.amount / transaction.credit.installments
                amount += partialAmount;
                return true;
        }

    });

    return {
        amount,
        transactions: filtered_trasactions
    }
}