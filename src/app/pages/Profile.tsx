import { Header } from '../components/Header'
import { UserForm } from '../components/UserForm';
import { useAuthStore } from '../../store/authStore';
import { Usuario } from '../../interfaces/Usuario';
import { EditIcon } from '../../ui/icons/EditIcon';
import { Button } from '@nextui-org/button';
import { AvatarEditorModal } from '../components/AvatarEditorModal';
import { useDisclosure } from '@nextui-org/modal';


export const Profile = () => {

  const user = useAuthStore((store) => store.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Header />
      <h2 className='text-center font-bold text-2xl mb-6'>Configuracion del Perfil</h2>
      <div className='w-[90%] lg:w-2/4 min-h-96 bg-secondary m-auto rounded-xl shadow-xl p-4'>
        <div className='h-36 bg-accent m-auto rounded-xl relative'>

          <div className='rounded-full w-36 h-36 bg-primary absolute left-0 right-0 -bottom-8 m-auto
          shadow-lg border-4 border-secondary'>
            <div className='relative w-full h-full rounded-full'>
              <Button isIconOnly className='rounded-full bg-green-500 absolute top-0 right-0 flex items-center justify-center'>
                <EditIcon onClick={onOpen} />
              </Button>
              <img alt="avatar" src={user?.foto} className='w-full h-full rounded-full' />
            </div>
          </div>

        </div>

        <UserForm inititalUserState={user as Usuario} />
        <AvatarEditorModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen}/>
      </div>
    </>
  )
}
