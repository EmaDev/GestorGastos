import { Button, DatePicker, Select, SelectItem, Spinner, Textarea } from '@nextui-org/react';
import { WalletSelector } from '../components/WalletSelector';
import { expenseCategories } from '../../interfaces/Category';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { walletContext } from '../../context/WalletContext';
import { Transaction as ITransaction } from '../../interfaces/Transacion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

function formatCurrency(value: any) {
    // Convierte el número a un formato de moneda
    return new Intl.NumberFormat("es-AR", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export const Transaction = () => {

    const { register, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { createTransaction, activeWallet } = useContext(walletContext);
    const [datePickerValue, setDatePickerValue] = useState<CalendarDate>(today(getLocalTimeZone()));
    const [isLaoding, setIsLoading] = useState<boolean>(false)

    const handleSubmit = onSubmit(async (data) => {
        setIsLoading(true);
        const queryParams = new URLSearchParams(location.search);
        const key = queryParams.get('transaction');

        if (!activeWallet || !key) return false;

        const amount = Number.parseFloat(data.amount.replaceAll(".", ""));
        const newTransaction: ITransaction = {
            amount,
            category: data.category,
            currency: activeWallet!.investment ? activeWallet?.investment.currency : "ARS",
            date: new Date(),
            type: key as "INCOME" | "EXPENSE",
            description: data.description || "",
        }

        if (activeWallet.type === "INVESTMENT") {

        }

        if (activeWallet.type === "CREDIT") {
            const expired: Date = datePickerValue.toDate(getLocalTimeZone());

            expired.setMonth(expired.getMonth() + Number.parseInt(data.installments))

            newTransaction.date = datePickerValue.toDate(getLocalTimeZone());
            newTransaction.credit = {
                amount,
                expired,
                installments: Number.parseInt(data.installments)
            }
        }
        console.log(newTransaction);
        await handleCreateTransaction(activeWallet.id || "", newTransaction);

    });

    const handleCreateTransaction = async (walletId: string, transaction: ITransaction) => {
        const resp = await createTransaction(walletId, transaction);

        if (resp) {
            navigate("/");
        }

    }

    const handleCurrencyChange = (event: any) => {
        const rawValue = event.target.value.replaceAll(".", "");
        const numericValue = parseInt(rawValue) || 0;
        setValue("amount", numericValue);
        event.target.value = formatCurrency(numericValue);
    };


    if (isLaoding) {
        return (
            <div className='w-full h-[100vh] bg-primary flex justify-center items-center'>
                <Spinner
                    size='lg'
                    label="Procesando..."
                    color="white" />
            </div>
        )
    }

    return (
        <div className='h-[95vh] flex flex-col items-center justify-center relative'>
            <div className='absolute top-2 left-0 right-0 m-auto'>
                <WalletSelector
                    className='m-auto'
                />
            </div>
            <form onSubmit={handleSubmit} className='absolute bottom-0'>
                <div className='flex justify-center items-center gap-2'>
                    <p className='text-4xl text-textPrimary'>$</p>
                    <input type='text' //ref={inputRef}
                        placeholder='0,00'
                        className='focus:outline-none text-5xl text-center w-3/4 bg-transparent text-text-Primary'
                        {...register("amount", {
                            required: {
                                value: true,
                                message: "El importe es requerido"
                            },
                        })}
                        onChange={handleCurrencyChange}
                    />
                </div>
                {errors.amount && <span className='text-red-400 ml-6 mt-2 block text-xs'>{errors.amount.message?.toString()}</span>}
                <div className='mt-8 w-full bottom-0 left-0 flex flex-col justify-center items-center'>
                    {
                        activeWallet?.type === "CREDIT" &&
                        <div className='flex gap-2'>
                            <div className="flex w-full max-w-xs flex-col gap-2">
                                <Select
                                    label="Catidad de cuotas"
                                    className="w-[50vw]"
                                    {...register("installments", {
                                        required: {
                                            value: true,
                                            message: "Cantidad de cuotas es requerida"
                                        },
                                    })}
                                >
                                    {["1", "2", "3", "4", "5,", "6", "12", "18", "24"].map((category) => (
                                        <SelectItem key={category}
                                            className='bg-secondary text-textPrimary py-2'
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.installments && <span className='text-red-400 ml-2  mt-1 block text-xs'>{errors.installments.message?.toString()}</span>}
                            </div>
                            <DatePicker
                                label="Fecha"
                                className="max-w-[284px]"
                                value={datePickerValue}
                                onChange={setDatePickerValue}
                            />
                        </div>
                    }
                    <div className="mt-4 flex w-full max-w-xs flex-col gap-2">
                        <Select
                            label="Selecciona un categoria"
                            className="w-full"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "La categoria es requerida."
                                },
                            })}
                        >
                            {
                                expenseCategories.find(current => current.type === activeWallet!.type)!.categories.map((category) => (
                                    <SelectItem key={category}
                                        className='bg-secondary text-textPrimary py-2'
                                    >
                                        {category}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                        {errors.category && <span className='text-red-400 ml-2  mt-1 block text-xs'>{errors.category.message?.toString()}</span>}
                    </div>
                    <div className='mt-4 w-full m-auto'>
                        <Textarea
                            label="Comentario"
                            placeholder="Escribe un comentario"
                            className="w-[95%] m-auto"
                            {...register("description", {
                            })}
                        />
                    </div>
                    <Button
                        type='submit'
                        className='block mx-0 w-full mt-4 bg-accent text-md'>
                        Confirmar
                    </Button>
                </div>
            </form>
        </div>
    )
}
