import { Rol } from '../../interfaces/Rol';
import { GradientButton } from '../../ui/components/GradientButton';
import { useForm } from 'react-hook-form';
import { Usuario } from '../../interfaces/Usuario';
import { updateUser } from '../../api/firebase/users';
import { useAuthStore } from '../../store/authStore';
import { useAlert } from '../../ui/hooks/useAlert';

const ROLES: Rol[] = ["Admin", "Consulta", "Vendedor", "Gerente", "Atención al cliente"];

interface Props {
  inititalUserState: Usuario;
}
export const UserForm = ({ inititalUserState }: Props) => {

  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);
  const {showAlert} = useAlert();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      nombre: inititalUserState.nombre,
      apellido: inititalUserState.apellido,
      telefono: inititalUserState.telefono,
      rol: inititalUserState.rol
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    const newUser = {
      ...inititalUserState,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      rol: data.rol
    }

    const { ok, msg } = await updateUser(newUser);

    if (ok) {
      if (user!.uid === newUser.uid) {
        setUser(newUser);
      }
      showAlert("Editar Usuario",msg, "success", () => {window.location.reload()});
    }
  });

  return (
    <form className='p-6 w-2/3 mt-8 m-auto' onSubmit={onSubmit}>
      <div className='mb-4 '>
        <input
          className="w-full p-3 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Nombre"
          {...register("nombre", {
            required: {
              value: true,
              message: "El nombre es requerido"
            },

          })}
        />
        {errors.nombre && <span className='text-red-500 ml-2 block text-xs'>{errors.nombre.message?.toString()}</span>}
      </div>

      <div className='mb-4'>
        <input
          className="w-full p-3 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Apellido"
          {...register("apellido", {
            required: {
              value: true,
              message: "El apellido es requerido"
            },
          })}
        />
        {errors.apellido && <span className='text-red-500 ml-2 block text-xs'>{errors.apellido.message?.toString()}</span>}
      </div>

      <div className='mb-4'>
        <input
          className="w-full p-3 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Telefono"
          {...register("telefono")}
        />
        {errors.telefono && <span className='text-red-500 ml-2 block text-xs'>{errors.telefono.message?.toString()}</span>}
      </div>


      <div className='mb-4'>
        <div className="relative h-10 w-full">
          <select
            defaultValue={watch("rol")}
            className="w-full p-3 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow focus:outline-none focus:shadow-outline"
            {...register("rol")}
          >
            {
              ROLES.map(rol => (<option key={rol} value={rol}>{rol}</option>))
            }
          </select>
          <label
            className="absolute left-0 -top-2.5 flex bg-secondary p-1 px-3 rounded border border-border text-textSecondary
            text-xs ml-4">
            Seleccione un Rol
          </label>
        </div>
        {errors.rol && <span className='text-red-500 ml-2 block text-xs'>El rol es requerido</span>}
      </div>

      <GradientButton onClick={() => { }} isSubmit text='Guardar cambios' className='mt-6' size='big'/>
    </form>
  )
}
