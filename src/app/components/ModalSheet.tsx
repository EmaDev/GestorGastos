import { useContext, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Transaction } from './Transaction';
import { Transaction as ITransaction } from '../../interfaces/Transacion';
import { walletContext } from '../../context/WalletContext';
import { Separator } from '../../ui/components/Separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@nextui-org/button';

export const ModalSheet = () => {

    const [isOpen, setOpen] = useState(false);
    const { activeWallet } = useContext(walletContext);
    const { isOpen: isModalOpen, onOpen: onOpenModal, onOpenChange, onClose } = useDisclosure();
    const [currentTransaction, setCurrentTransaction] = useState<ITransaction>({} as ITransaction);

    return (
        <>
            <button onClick={() => setOpen(true)}>Ver todas</button>

            <Sheet
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                snapPoints={isModalOpen ? [0] : [800, 0]}
            >
                <Sheet.Container>
                    <Sheet.Header className='bg-primary' />
                    <Sheet.Content
                        className={`bg-primary text-textPrimary px-4`}
                    >
                        <h2 className='font-[600] m-2 text-textSecondary'>Todas las operaciones</h2>
                        <div className='overflow-auto'>
                            {
                                activeWallet?.transactions.map((transaction, index) => (
                                    <Transaction
                                        key={index}
                                        data={transaction}
                                        onPress={() => {
                                            setCurrentTransaction(transaction);
                                            onOpenModal()
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </Sheet.Content>

                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
            <Modal
                isOpen={isModalOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                size='full'
                backdrop='opaque'>
                <ModalContent>
                    {
                        currentTransaction.amount &&
                        <ModalBody className='text-textPrimary py-6 mt-10'>
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
                                     $${Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format((currentTransaction.credit!.amount / currentTransaction.credit!.installments))}
                                    `}</p>
                                    <p>{`Vence ${format(currentTransaction.credit!.expired.toDate(), "dd 'de' MMMM", { locale: es })}`}</p>
                                    <Separator className='w-full mb-4' />
                                </>
                            }

                            <span className='text-md block'>Categoria: <b>{currentTransaction.category}</b></span>
                            <p className='mt-2'>{`Descripcion: ${currentTransaction.description}`}</p>
                        </ModalBody>
                    }
                    <ModalFooter>
                        <Button color="danger" variant="bordered"  className='text-white' onPress={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}
