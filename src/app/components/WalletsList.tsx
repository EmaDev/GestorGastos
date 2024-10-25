import { useContext } from 'react'
import { Wallet } from '../../interfaces/Wallet';
import { walletContext } from '../../context/WalletContext';
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from '../../ui/components/Separator';
import { MdKeyboardArrowRight } from "react-icons/md";
import { NewWalletModal } from './NewWalletModal';

interface Props {
  isVisible: boolean;
  list: Wallet[];
}

export const WalletsList = () => {

  const { wallets, setActiveWallet } = useContext(walletContext);

  const handleSetActiveWallet = (wallet: Wallet) => {
    setActiveWallet(wallet);
  }

  return (
    <div className='w-full px-2 mt-8'>
      <div className='w-full px-2 flex justify-between items-center'>
        <h3 className="font-[600] text-lg">Mis Billeteras</h3>
        <NewWalletModal/>
      </div>
      {
        wallets.map(wallet => (
          <div key={wallet.id} className='shadow-lg w-full m-auto my-4 bg-secondary p-2 pb-4 rounded-lg'>
            <div
              onClick={() => handleSetActiveWallet(wallet)}
              className='bg-accent text-white font-[600] rounded-lg px-2 py-1 flex justify-between items-center'>
              <p>{wallet.title}</p>
              <MdKeyboardArrowRight className='h-6 w-6' />
            </div>
            <p className='text-2xl mt-3'>
              <b>
                {new Intl.NumberFormat('es', { maximumSignificantDigits: 8 }).format(wallet.totalMonth)}
              </b>
            </p>
            <p className='text-sm mt-2'>
              {wallet.transactions.length + " operaciones"}
            </p>
            <Separator className='my-2' />
            <p className='text-xs mt-2'>{"Ultima opreación: "}
              <b>
                {formatDistance(wallet.lastUpdate.toDate(), new Date(), { addSuffix: true, locale: es })}
              </b>
            </p>
          </div>
        ))
      }
    </div>
  )
}
