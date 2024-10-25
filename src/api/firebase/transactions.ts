import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { app } from "../../config/firebase/config";
import { Transaction } from "../../interfaces/Transacion";
import { Wallet } from "../../interfaces/Wallet";
import { getCreditTransactionByMonth, getTransactionByMonth } from "../helpers";

const db = getFirestore(app);

interface Response {
    ok: boolean;
    data?: any;
    msg?: string;
}
export const getWallet = async (userId: string, walletId: string): Promise<Response> => {
    try {

        const walletColection = collection(db, "users", userId, "wallet");

        const q = query(walletColection, where("__name__", "==", walletId));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const walletDoc = querySnapshot.docs[0];
            const transactions = getTransactionByMonth(new Date, walletDoc.data().transactions.reverse());

            return {
                ok: true,
                data: {
                    ...walletDoc.data(),
                    id: walletDoc.id,
                    transactions: transactions.transactions,
                    totalMonth: transactions.amount,
                }
            };
        } else {
            return {
                ok: false,
                msg: "No se encontro el documento"
            };
        }
    } catch (error: any) {
        return {
            ok: false,
            msg: error.message
        }
    }
}

export const getAllWallets = async (userId: string): Promise<Response> => {
    try {
        const q = query(collection(db, "users", userId, "wallet"));
        const querySnapshot = await getDocs(q);

        const wallets: Wallet[] = [];

        querySnapshot.forEach((doc) => {

            
            const currentWallet:Wallet = doc.data() as Wallet; 
            let transactions:{transactions: Transaction[]; amount:number} = {
                amount: 0,
                transactions: []
            }; 
            if(currentWallet.type === "DEBIT"){
                transactions = getTransactionByMonth(new Date, currentWallet.transactions.reverse());

            }else if(currentWallet.type === "CREDIT"){
                transactions = getCreditTransactionByMonth(new Date, currentWallet.transactions.reverse())
            }

            wallets.push({
                ...doc.data(),
                id: doc.id,
                totalMonth: transactions.amount,
                transactions: transactions.transactions
            } as Wallet)
        });

        if (!querySnapshot.empty) {

            return {
                ok: true,
                data: wallets
            };
        } else {
            return {
                ok: false,
                msg: "No se encontro el documento"
            };
        }
    } catch (error: any) {
        return {
            ok: false,
            msg: error.message
        }
    }
}
export const addTransaccionToWallet = async (userId: string, waletId: string, transaction: Transaction): Promise<Response> => {

    try {
        const walletDocRef = doc(db, "users", userId, "wallet", waletId);
        const walletData: Wallet = (await getDoc(walletDocRef)).data() as Wallet;

        const currentDate = new Date();
        const lastUpdate = walletData.lastUpdate.toDate();
        const isSameMonth = currentDate.getMonth() === lastUpdate.getMonth();
        
        const currentTotal = walletData.total;
        
        const totalMonth = !isSameMonth
            ? transaction.amount
            : transaction.type === "INCOME"
                ? ( walletData.totalMonth + transaction.amount)
                : ( walletData.totalMonth - transaction.amount)
            

        let updateMonthHistory = walletData.monthHistory;
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        if (isSameMonth) {
            updateMonthHistory = updateMonthHistory.map((monthItem) => {
                if (monthItem.month === month && monthItem.year === year) 
                    return {
                        ...monthItem,
                        total: transaction.type === "INCOME"
                            ? (monthItem.total + transaction.amount)
                            : (monthItem.total - transaction.amount),
                        lastActivity: currentDate
                    }
                return monthItem
            })
        }else{
            updateMonthHistory.push({
                initial: walletData.totalMonth,
                lastActivity: currentDate,
                month,
                year,
                total: transaction.type === "INCOME"
                ? (0 + transaction.amount)
                : (0 - transaction.amount),
            })
        }

        let newWalletData:any = {
            lastUpdate: Timestamp.fromDate(new Date()),  
            total: transaction.type === "INCOME" ? currentTotal + transaction.amount : currentTotal - transaction.amount,
            totalMonth,
            monthHistory: updateMonthHistory,
        };

        console.log(newWalletData);


        if(walletData.type === "DEBIT" && !isSameMonth){
            newWalletData.DEBIT = {
                initial: walletData.totalMonth
            }
        }

        await updateDoc(walletDocRef, {
            ...newWalletData,
            transactions: arrayUnion(transaction),
        });
        return {
            ok: true,
            msg: "Agregado correctamente"
        };
    } catch (error: any) {
        return {
            ok: false,
            msg: error.message
        }
    }
}

export const createNewWallet = async (userId: string, wallet: Wallet): Promise<Response> => {

    try {
        const walletColRef = collection(db, "users", userId, "wallet");
        await addDoc(walletColRef, wallet);
        return {
            ok: true,
            msg: "Agregado correctamente"
        };
    } catch (error: any) {
        return {
            ok: false,
            msg: error.message
        }
    }
}