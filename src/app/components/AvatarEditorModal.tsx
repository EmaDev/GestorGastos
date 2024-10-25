import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/modal';
import { getRandomImages } from '../../api/images';
import { GradientButton } from '../../ui/components/GradientButton';
import { Loading } from '../../ui/components/Loading';
import { updateUser } from '../../api/firebase/users';
import { Usuario } from '../../interfaces/Usuario';
import { useAuthStore } from '../../store/authStore';
import { useAlert } from '../../ui/hooks/useAlert';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
}
export const AvatarEditorModal = ({ isOpen, onOpenChange, onOpen}: Props) => {

    const [listImages, setListImages] = useState<any>([]);
    const [activeImage, setActiveImage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {showAlert} = useAlert();
    const user = useAuthStore((store) => store.user);
    const setUser = useAuthStore((store) => store.setUser);

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            setListImages(await getRandomImages());
            setIsLoading(false);
        }
        loadImages();
    }, []);

    const handleUpdteAvatar = async() => {
        const {ok, msg} = await updateUser({
            ...user,
            foto: activeImage
        } as Usuario);

        if(ok){
            setUser( {...user, foto: activeImage} as Usuario);
            showAlert("Imagen editada",msg, "success");
            onOpen();
        }

    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                size='4xl'
                onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        <h4 className='text-textPrimary m-4 font-bold text-xl'>Selecciona una imagen..</h4>
                        {
                            (isLoading) ?
                                <Loading />
                                :
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
                                    {
                                        listImages.map((item: any) => (
                                            <div key={item.id}
                                                className={`
                                            ${item.download_url == activeImage && " border-2 border-accent"}
                                            rounded-lg w-36 h-24 cursor-pointer transtion-all duration-100
                                            `}
                                                onClick={() => { setActiveImage(item.download_url) }}
                                            >
                                                <img src={item.download_url} className='w-full h-full rounded-lg' />
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <GradientButton text='Guardar imagen' onClick={handleUpdteAvatar} className='mt-6' />
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}
