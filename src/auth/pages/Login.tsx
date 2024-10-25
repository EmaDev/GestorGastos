import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BaseLayout } from '../components/BaseLayout';
import { Separator } from '../../ui/components/Separator';
import { GradientButton } from '../../ui/components/GradientButton';
import { GoogleButton } from '../../ui/components/GoogleButton';
import { loginWithEmailAndPassword } from '../../api/firebase/auth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAlert } from '../../ui/hooks/useAlert';
import { Loading } from '../../ui/components/Loading';

export const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const login = useAuthStore((store) => store.login);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const { ok, data: user, msg } = await loginWithEmailAndPassword(data.email, data.password);

    setIsLoading(false);
    if (ok) {
      login(user);
    } else {
      showAlert("Error", `<p>${msg}</p>`, "error");
    }

  });

  return (
    <BaseLayout>
      {isLoading ? <Loading /> :
        <>
          <h3 className="py-4 text-4xl font-bold text-center text-textPrimary">Ingresar</h3>
          <form className='md:w-2/3 m-auto' onSubmit={onSubmit}>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-bold text-textPrimary" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-2 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El Email es requerido"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Email no válido",
                  },
                })}
              />
              {errors.email && <span className='text-red-500 ml-2 block text-xs'>{errors.email.message?.toString()}</span>}
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-bold text-textPrimary" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full p-2 text-sm text-textSecondary leading-tight bg-secondary border border-border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="****"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida"
                  },
                })}
              />
              {errors.password && <span className='text-red-500 ml-2 block text-xs'>{errors.password.message?.toString()}</span>}
            </div>
            <GradientButton isSubmit onClick={() => { }} text='Ingresar' size='medium' className='mt-4 font-semibold' />

          </form>
          <GoogleButton />
          <Separator className='my-6' />
          <div className='mt-6'>
            <div className="text-center">
              <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                to={"/registro"}>
                No tenes una cuenta? Registrate aca!
              </Link>
            </div>
          </div>

        </>
      }
    </BaseLayout>
  )
}
