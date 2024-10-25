import { useAuthStore } from '../../store/authStore';
import { Separator } from '../../ui/components/Separator';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from '@nextui-org/button';
import { RiLogoutBoxLine } from "react-icons/ri";
import { WalletSelector } from './WalletSelector';

export const Header = () => {

    const user = useAuthStore((store) => store.user);
    const logout = useAuthStore((store) => store.logout);

    const renderName = (name: string): string => {

        const firstName = name.split(" ")[0];

        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return (
        <div className='w-full px-4 pt-4 max-h-[140px]'>
            <header className='flex gap-1 justify-between items-center'>
                <div className='flex justify-start items-center w-full gap-4'>
                    <div>
                        <div className='w-10 h-10 md:h-16 md:w-16 rounded-full bg-primary shadow-lg border-1 border-secondary'>
                            <img alt="avatar" src={user?.foto} className='w-full h-full rounded-full' />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-xl md:text-3xl'>Hola, {renderName(user?.nombre || "")}</h3>
                    </div>
                </div>
                <MdKeyboardArrowRight className='h-6 w-6' />
            </header>
            <Separator className='my-2 md:mb-4' />
            <div className='flex justify-between items-center md:hidden mb-3'>

                <WalletSelector 
                className='m-0 '
                />

                <Button
                    color='danger'
                    variant="bordered"
                    startContent={<RiLogoutBoxLine />}
                    className='h-8 font-[600] md:hidden'
                    onClick={logout}
                >
                    Salir
                </Button>
            </div>
        </div>
    )
}
