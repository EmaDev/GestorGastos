import { useState } from 'react'
import { ToggleTheme } from '../../ui/components/ToggleTheme'
import { NavLink } from 'react-router-dom'
import { ArrowIcon } from '../../ui/icons/ArrowIcon'
import { GradientButton } from '../../ui/components/GradientButton'
import { useAuthStore } from '../../store/authStore'

export const SideBar = () => {

    const [sidebarFull, setSidebarFull] = useState<boolean>(true);

    const logout = useAuthStore((store) => store.logout);

    return (
        <aside className={
            `hidden md:flex min-h-[100vh] bg-accent border-l border-border shadow shadow-black relative
            transition-all duration-700 
            ${sidebarFull ? "w-72" : "w-48"}
            `}>
            <ul className='p-4 w-full h-full pt-24 text-white'>
                <ToggleTheme />
                <br />
                <li className='mt-4 p-2 text-2xl font-bold border-b border-[rgba(0,0,0,0.2)] shadow-lg'>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-textPrimary" : "text-[rgba(255,255,255,0.3)]"}
                        to="/"
                    >
                        Inicio
                    </NavLink>
                </li>
                <li className='mt-4 p-2 text-2xl font-bold border-b border-[rgba(0,0,0,0.2)] shadow-lg'>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-textPrimary" : "text-[rgba(255,255,255,0.3)]"}
                        to="/admin"
                    >
                        Admin
                    </NavLink>
                </li>
                <li className='mt-4 p-2 text-2xl font-bold border-b border-[rgba(0,0,0,0.2)] shadow-lg'>
                    <NavLink
                        className={({ isActive }) => isActive ? "text-textPrimary" : "text-[rgba(255,255,255,0.3)]"}
                        to="/perfil"
                    >
                        Perfil
                    </NavLink>
                </li>
                <li className='mt-12'>
                    <GradientButton onClick={logout} text='Cerrar sesion' />
                </li>
            </ul>

            <button
                onClick={() => { setSidebarFull(!sidebarFull) }}
                className='absolute top-0 bottom-0 m-auto h-16 w-16 rounded-full -right-6 
                bg-accent shadow-xl text-white items-center justify-center'>
                <div className={`transition-all duration-700 ${!sidebarFull && "rotate-180"}`}>
                    <ArrowIcon />
                </div>
            </button>
        </aside>
    )
}
