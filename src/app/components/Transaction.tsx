import { Separator } from '../../ui/components/Separator'
import { Transaction as TransationInterface } from '../../interfaces/Transacion'
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { format } from 'date-fns';
import { es } from "date-fns/locale";
import { WalletType } from '../../interfaces/Wallet';
import { ReactNode } from 'react';

interface Props {
    walletType?: WalletType;
    data: TransationInterface;
    onPress?: any;
}
export const Transaction = ({ walletType = "DEBIT", data, onPress }: Props) => {

    const returnAmount = (): ReactNode => {
        if (walletType === "DEBIT") {

            return (
                <span className='text-textPrimary font-[600] text-lg'>
                    {"$" + Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(data.amount)}
                </span>
            )
        }

        if (walletType === "CREDIT") {
            const partialAmount = data.amount / data.credit!.installments;

            return (
                <div className='flex flex-col justify-end items-end'>
                    <span className='text-md'>
                        {`$ ${Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(partialAmount)}`}
                    </span>
                    <span className='text-xs text-textSecondary'>  
                        {`Total: $ ${Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(data.amount)}`}
                    </span>
                </div>
            )
        }

        return <></>
    }
    return (
        <>
            <div className='mt-2 py-3 px-2 hover:bg-primary rounded-lg'
                onClick={onPress}>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>

                        {
                            data.type === "INCOME" ?
                                <GoArrowUpRight
                                    className='text-green-700 font-[800] h-6 w-6'
                                />
                                :
                                <GoArrowDownLeft
                                    className='text-red-400 font-[800] h-6 w-6'
                                />
                        }
                        <div>

                            <span className='text-textPrimary text-md block'>
                                {data.description ?
                                    data.description?.slice(0, 25) + "..."
                                    :
                                    data.category
                                }
                            </span>
                            <span className='text-textSecondary font-[400] text-xs block'>
                                {format(data.date.toDate(), "dd 'de' MMMM", { locale: es })}
                            </span>
                        </div>
                    </div>
                    {returnAmount()}
                </div>
            </div>
            <Separator />
        </>
    )
}
