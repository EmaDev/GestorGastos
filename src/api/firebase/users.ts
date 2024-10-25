import { getFirestore, doc, updateDoc, query, collection, getDocs, deleteDoc } from "firebase/firestore";
import { app } from "../../config/firebase/config";
import { Usuario } from "../../interfaces/Usuario";

const db = getFirestore(app);

interface Response {
    ok: boolean;
    msg?: string;
    data?: any;
}

export const updateUser = async (user: Usuario): Promise<Response> => {
    try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            ...user
        });

        return {
            ok: true,
            msg: "Usuario guardado correctamente"
        }
    } catch (e: any) {
        return {
            ok: false,
            msg: e.code
        }
    }
}

export const deleteUser = async (uid: string): Promise<Response> => {
    try {

        await deleteDoc(doc(db, "users", uid));
        return {
            ok: true,
            msg: "Usuario eliminado."
        }
    } catch (e: any) {
        return {
            ok: false,
            msg: e.code
        }
    }
}

export const getListUsers = async (): Promise<Response> => {
    try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const users: Usuario[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as Usuario);
        });
        return {
            ok: true,
            data: users
        }
    } catch (e: any) {

        return {
            ok: false,
            msg: e.code
        }
    }
}