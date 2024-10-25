import { Rol } from "./Rol";

export interface Usuario {
    uid: string;
    nombre:    string;
    apellido:  string;
    telefono:  string;
    email:     string;
    foto:      string;
    rol:       Rol;
    filled: boolean;
}