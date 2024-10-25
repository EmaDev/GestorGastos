import { useContext, useState } from 'react'
import { ModalSheet } from './ModalSheet'
import { Transaction } from './Transaction'
import { walletContext } from '../../context/WalletContext';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/modal';
import { Transaction as ITransaction } from '../../interfaces/Transacion';
import { Separator } from '../../ui/components/Separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const ListTransations = () => {

    const { activeWallet } = useContext(walletContext);
    const [currentTransaction, setCurrentTransaction] = useState<ITransaction>({} as ITransaction);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <div className='mt-4 bg-secondary border-2 border-secondary rounded-lg py-6 p-2 shadow-md'>
            <div className='flex justify-between items-center px-4'>
                <h1 className='font-[600] text-textSecondary mb-2'>Operaciones</h1>
                <ModalSheet />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {
                        currentTransaction.amount &&
                        <ModalBody className='text-textPrimary py-6'>
                            <p className='font-[700] text-3xl'>
                                {"$" + Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(currentTransaction.amount)}
                            </p>
                            <span className='text-textSecondary font-[400] text-sm block'>
                                {format(currentTransaction.date.toDate(), "dd 'de' MMMM", { locale: es })}
                            </span>
                            <Separator className='w-full mb-4' />
                            {
                                activeWallet?.type === "CREDIT" &&
                                <>
                                    <p>{`${currentTransaction.credit?.installments} cuotas de 
                                     $${Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format( (currentTransaction.credit!.amount / currentTransaction.credit!.installments))}
                                    `}</p>
                                    <p>{`Vence ${format( currentTransaction.credit!.expired.toDate(), "dd 'de' MMMM", { locale: es })}`}</p>
                                    <Separator className='w-full mb-4' />
                                </>
                            }

                            <span className='text-md block'>Categoria: <b>{currentTransaction.category}</b></span>
                            <p className='mt-2'>{`Descripcion: ${currentTransaction.description}`}</p>
                        </ModalBody>
                    }
                </ModalContent>
            </Modal>
            {
                activeWallet?.transactions.slice(0, 5).map((transaction, index) => (
                    <Transaction
                        key={index}
                        walletType={activeWallet.type}
                        data={transaction}
                        onPress={() => {
                            setCurrentTransaction(transaction);
                            onOpen()
                        }}
                    />
                ))
            }
            {
                activeWallet?.transactions.length === 0 &&
                <p className='text-sm text-center mt-4 text-textSecondary'>No hay operaciones</p>
            }
        </div>
    )
}
