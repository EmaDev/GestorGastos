import { createContext, useEffect, useState } from 'react'
import { Wallet } from '../interfaces/Wallet';
import { useAuthStore } from '../store/authStore';
import { addTransaccionToWallet, createNewWallet, getAllWallets, getWallet } from '../api/firebase/transactions';
import { Transaction } from '../interfaces/Transacion';


interface WalletContextProps {
    wallets: Wallet[];
    activeWallet: Wallet|undefined;
    setActiveWallet: (wallet: Wallet|undefined) => void;
    setActiveWalletById: (walletId:string) => void;
    setWallets: (wallets: Wallet[]) => void;
    createWallet: (wallet:Wallet) => void;
    createTransaction: (walletId: string, transaction:Transaction) => Promise<boolean>;
}

export const walletContext = createContext({} as WalletContextProps);

export const WalletContextProvider = ({ children }: any) => {
    
    const user = useAuthStore((store) => store.user);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [activeWallet, setActiveWallet] = useState<Wallet>();
    
    useEffect( () => {
        if(user?.uid){
            getWallets(user.uid);
        }
    },[user])

    const getWallets = async(uid: string) => {
        const resp = await getAllWallets(uid);
        if(resp.data){
            setWallets(resp.data);
        }
    }

    const reloadWallet = async(walletId: string) => {
        //if(!user) return false
        const resp = await getWallet(user!.uid, walletId);
        if(resp.ok){
            setActiveWallet(resp.data);
        }
    }

    const createWallet = async(wallet:Wallet):Promise<boolean> => {
        //if(!user) return false;
        const resp = await createNewWallet(user!.uid, wallet);

        return resp.ok
    }

    const createTransaction = async(walletId: string, transaction:Transaction):Promise<boolean> => {
        //if(!user) return false;
        const resp = await addTransaccionToWallet(user!.uid, walletId, transaction);
        if(resp.ok){
            await reloadWallet(walletId);
        }

        return resp.ok
    }

    const setActiveWalletById = async( walletId: string ) => {
        if(walletId === "0"){
            setActiveWallet(undefined)
        }else{
            await reloadWallet(walletId)
        }
    }

    return (
        <walletContext.Provider
            value={{
                activeWallet,
                wallets,
                setActiveWallet,
                setActiveWalletById,
                setWallets,
                createWallet,
                createTransaction
            }}>
            {children}
        </walletContext.Provider>
    )
}
