import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Usuario } from "../interfaces/Usuario";
import { Rol } from "../interfaces/Rol";

interface AuthState {
    isLogged: boolean;
    user: Usuario|null;
}

interface Actions {
    setUser: (user:Usuario) => void;
    login: (user:Usuario) => void;
    logout: () => void;
    getRol: () => Rol;
}


export const useAuthStore = create(persist<AuthState & Actions>((set, state) => ({
    isLogged: false,
    user: null,
    setUser: (user:Usuario) => set(() => ({user})),
    login: (user:Usuario) => set(() => ({
        isLogged: true,
        user
    })),
    logout: () => set(() => ({
        isLogged: false,
        user:null
    })),
    getRol: () => {
        return state().user ? state().user!.rol : "Consulta";
    },
}), { name: "auth" }))