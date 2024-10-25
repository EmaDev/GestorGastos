import { useContext, useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { Wallet, WalletType } from "../../interfaces/Wallet";
import { useForm } from "react-hook-form";
import { walletContext } from "../../context/WalletContext";


export const NewWalletModal = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [walletType, setWalletType] = useState<WalletType>("DEBIT");
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { createWallet } = useContext(walletContext);

    useEffect(() => {
        reset()
    }, [isOpen]);

    const handleWalletTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setWalletType(value as WalletType);
    }


    const onSubmit = handleSubmit(async (data) => {

        const currentDate = new Date();
        const newWallet: Wallet = {
            title: data.title,
            total: 0,
            lastUpdate: currentDate as any,
            totalMonth: 0,
            transactions: [],
            type: data.type,
            monthHistory: [
                {
                    initial: data.initial ?  Number.parseFloat(data.initial) : 0,
                    total: data.initial ?  Number.parseFloat(data.initial) : 0,
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear(),
                    lastActivity: currentDate
                }
            ]
        }
        if (walletType === "DEBIT") {
            newWallet.total = Number.parseFloat(data.initial);
            newWallet.totalMonth = Number.parseFloat(data.initial);
            newWallet.debit = {
                initial: Number.parseFloat(data.initial),
            }
            newWallet.transactions = [
                {
                    type: "INCOME",
                    amount: Number.parseFloat(data.initial),
                    currency: "ARS",
                    category: "",
                    date: new Date(),
                    description: "Creacion de la billetera",
                }
            ]
        }else if(walletType === "CREDIT"){
            newWallet.credit = {
                limit: Number.parseFloat(data.limit)
            }
        } else {
            newWallet.investment = {
                currency: data.currency,
                goal: data.goal || 0,
                initial_quote: {
                    blue: 1500,
                    oficial: 1500,
                }
            }
        }

        createWallet(newWallet);
    });

    return (
        <>
            <Button isIconOnly className='bg-accent rounded-full'
                onClick={onOpen}>
                <FaPlus />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-textPrimary">Crear Nueva billetera</ModalHeader>
                            <ModalBody className="text-textPrimary">

                                <form onSubmit={onSubmit} className="w-full">

                                    <div>
                                        <Input
                                            {...register(
                                                "title",
                                                {
                                                    required: "El nombre es obligatorio"
                                                }
                                            )}
                                            type="text" label="Nombre" />
                                        {errors.title &&
                                            <span className="text-red-400 text-sm ml-4">
                                                {errors.title.message!.toString()}
                                            </span>
                                        }
                                    </div>

                                    <div>
                                        <Select
                                            items={
                                                [
                                                    { key: "DEBIT", label: "Consumo" },
                                                    { key: "INVESTMENT", label: "Inversión" },
                                                    { key: "CREDIT", label: "Crédito" }
                                                ]
                                            }
                                            label="Tipo de billetera"
                                            placeholder="Selecciona un tipo"
                                            className="w-full mt-4"
                                            {...register(
                                                "type",
                                                {
                                                    required: "El tipo es obligatorio",
                                                    onChange: (e) => {
                                                        handleWalletTypeChange(e);
                                                        setValue("type", e.target.value);
                                                    },
                                                }
                                            )}

                                        >
                                            {(tipo) => <SelectItem
                                                className="text-textPrimary"
                                                key={tipo.key}>{tipo.label}</SelectItem>}
                                        </Select>
                                        {errors.type &&
                                            <span className="text-red-400 text-sm ml-4">
                                                {errors.type.message!.toString()}
                                            </span>
                                        }
                                    </div>
                                    {walletType === "DEBIT" && (
                                        <div className="space-y-4 mt-4">
                                            <h3 className="text-lg font-semibold">Detalles de consumo</h3>
                                            <Input
                                                type="number"
                                                label="Monto inicial"
                                                placeholder="Ingresa el monto inicial"
                                                {...register(
                                                    "initial",
                                                )}
                                            />
                                        </div>
                                    )}

                                    {walletType === "CREDIT" && (
                                        <div className="space-y-4 mt-4">
                                            <h3 className="text-lg font-semibold">Detalles del Crédito</h3>
                                            <Input
                                                type="number"
                                                label="Monto límite"
                                                placeholder="Ingresa el monto límite"
                                                {...register(
                                                    "limit",
                                                )}
                                            />
                                        </div>
                                    )}
                                    {walletType === "INVESTMENT" && (
                                        <div className="space-y-4 mt-4">
                                            <h3 className="text-lg font-semibold">Detalles de Inversión</h3>
                                            <Input
                                                type="number"
                                                label="Meta de Inversión: "
                                                placeholder="Ingresa el monto"
                                                {...register(
                                                    "goal",
                                                )}
                                            />
                                            <div>
                                                <Select
                                                    items={
                                                        [
                                                            { key: "ARS", label: "ARS" },
                                                            { key: "US", label: "US" }
                                                        ]
                                                    }
                                                    label="Tipo Moneda"
                                                    placeholder="Selecciona un tipo"
                                                    className="w-full mt-2"
                                                    {...register(
                                                        "currency",
                                                        {
                                                            required: "El tipo de moneda es obligatorio",
                                                        }
                                                    )}

                                                >
                                                    {(tipo) => <SelectItem
                                                        className="text-textPrimary"
                                                        key={tipo.key}>{tipo.label}</SelectItem>}
                                                </Select>
                                                {errors.currency &&
                                                    <span className="text-red-400 text-sm ml-4">
                                                        {errors.currency.message!.toString()}
                                                    </span>
                                                }
                                            </div>
                                        </div>

                                    )}

                                    <ModalFooter>
                                        <Button color="danger" variant="light" type="button" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button className="text-textPrimary bg-accent" type="submit">
                                            Guardar
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
