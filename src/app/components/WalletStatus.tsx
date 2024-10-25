import { Button } from "@nextui-org/button";
import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { walletContext } from "../../context/WalletContext";
import { Wallet } from '../../interfaces/Wallet';
import { useNavigate } from "react-router-dom";

export const WalletStatus = () => {

    const { activeWallet } = useContext(walletContext);
    const navigate = useNavigate();


    const calculateAvailable = () => {

        console.log(activeWallet);
        if (activeWallet!.type === "DEBIT") {
            let total = (activeWallet!.totalMonth);
            return new Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(total)


        } else if (activeWallet?.type === "CREDIT") {
            let total = (activeWallet.credit!.limit - activeWallet!.totalMonth);
            return Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(total)
        }
    }

    return (
        <div className='mt-4 p-4 rounded-xl bg-secondary border-2 border-secondary relative 
        shadow-md bg-gradient-to-b from-primary'>
            <button className='absolute top-3 right-3 text-xl'>
                <FaEye />
            </button>
            <p className='text-sm text-textSecondary font-[500]'>Disponible</p>
            <p className='text-3xl font-[600]'>{"$ " + calculateAvailable()}</p>

            <ProgressBar wallet={activeWallet as Wallet} />

            <div className="flex mt-2 gap-3">
                {activeWallet?.type !== "CREDIT" &&
                    <Button
                        onClick={() => navigate(`/transaction?transaction=INCOME`)}
                        className="w-full flex gap-2 bg-green-600 text-white">
                        <span className="font-[600]">
                            {
                                activeWallet?.type === "DEBIT" ? "Ingreso" : "Venta"
                            }
                        </span>
                        <GoArrowUpRight />
                    </Button>
                }
                <Button
                    onClick={() => navigate(`/transaction?transaction=EXPENSE`)}
                    className="w-full flex gap-2 bg-red-400 text-white">
                    <span className="font-[600]">
                        {
                            activeWallet?.type === "DEBIT" ? "Gasto"
                                : activeWallet?.type === "CREDIT" ? "Nueva operacion"
                                    : "Compra"
                        }
                    </span>
                    <GoArrowDownRight />
                </Button>
            </div>
        </div>
    )
}

interface ProgressBarProps {
    wallet: Wallet;
}


const ProgressBar = ({ wallet }: ProgressBarProps) => {

    const calcultePercentage = (): number => {

        if (wallet.type === "DEBIT") {
            if (wallet.totalMonth >= (wallet.debit!.initial)) {
                return 0
            }

            const percentaje = ((wallet.totalMonth * 100) / (wallet.debit!.initial)).toPrecision(2);
            return (100 - Number.parseInt(percentaje));
        } else if (wallet.type === "CREDIT") {

            if (wallet.totalMonth <= 0) {
                return 0
            }
            const percentaje = ((wallet.totalMonth * 100) / (wallet.credit!.limit)).toPrecision(2);

            if (Number.parseFloat(percentaje) < 1) {
                return 0;
            }
            return (Number.parseInt(percentaje));
        }

        return 0
    }

    const renderTotalByType = (): string => {

        if (wallet.type === "DEBIT") {
            return "$" + new Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(wallet.debit!.initial)
        }else if(wallet.type === "CREDIT"){
            return "$" + new Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(wallet.credit!.limit)
        }
        return "";
    }


    return (
        <div className='flex flex-col items-end'>
            <div className='w-fit'>
                <p className='text-sm text-textSecondary font-[500] text-right'>{wallet.type === "CREDIT" ? "Límite" : "Total"}</p>
                <p className='text-lg font-[600]'>{renderTotalByType()}</p>
            </div>

            <div className='w-full mt-2 h-6 bg-secondary rounded-lg border border-accent'>
                <div className={`h-full bg-accent rounded-lg flex  justify-center items-center`} style={{ width: calcultePercentage() + "%" }}>
                    <p className={`w-full text-right text-xs text-white font-[700] 
                ${(calcultePercentage() > 20) ? "pr-2" : "pl-2"}`}>{calcultePercentage() + "%"}</p>
                </div>
            </div>
        </div>
    )
}