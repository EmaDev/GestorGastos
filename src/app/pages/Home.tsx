import { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { WalletStatus } from '../components/WalletStatus';
import { ListTransations } from '../components/ListTransations';
//import { useAuthStore } from '../../store/authStore';
import { WalletsList } from '../components/WalletsList';
import { walletContext } from '../../context/WalletContext';
import { Spinner } from '@nextui-org/react';

export const Home = () => {

  //const user = useAuthStore((store) => store.user);
  const [isLaoding, setIsLoading] = useState<boolean>(true);
  const { activeWallet } = useContext(walletContext)


  useEffect( () => {
    setIsLoading(false)
  },[])

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
    <>
      <Header />
      {
        activeWallet ?
          <>
            <WalletStatus />
            <ListTransations />
          </>
          :
          <WalletsList />
      }

    </>

  )
}
