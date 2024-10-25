import { Transaction } from './Transacion';
import { Timestamp } from "firebase/firestore";

export type WalletType = "INVESTMENT" | "DEBIT"| "CREDIT"

export interface Wallet {
    id?: string;
    type: WalletType;
    title: string;
    transactions: Transaction[];
    total: number;
    totalMonth: number;
    monthHistory: {
        initial: number;
        total: number;
        month: number;
        year: number;
        lastActivity: Date;
    }[]
    lastUpdate: Timestamp;
    debit?: TypeDebit;
    investment?: typeInvestment;
    credit?: typeCredit;
}

export interface TypeDebit {
    initial: number;
}

export interface typeInvestment {
    goal: number;
    currency: "US" | "ARS";
    initial_quote: {
        oficial: number;
        blue: number;
    }
}

export interface typeCredit {
    limit: number;
} 