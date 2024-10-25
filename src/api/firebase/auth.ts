import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../config/firebase/config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Usuario } from "../../interfaces/Usuario";

const db = getFirestore(app);
const auth = getAuth(app);

interface Response {
    ok: boolean;
    msg?: string;
    data?: any;
}


export const createNewUserWithEmailAndPassword = async (email: string, password: string, nombre: string):Promise<Response> => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        const baseUser: Usuario = {
            uid: user.uid,
            email,
            nombre,
            apellido: "",
            foto: user.photoURL || '',
            telefono: user.phoneNumber || '',
            rol: "Consulta",
            filled: false
        }

        await setDoc(doc(db, "users", user.uid), baseUser);

        return {
            ok: true,
            msg: 'Usuario creado correctamente',
            data: baseUser
        }
    } catch (e: any) {
        return{
            ok: false,
            msg: e.message,
        }
    }
};

export const signInWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);

        const docSnap = await getDoc(doc(db, 'users', user.uid));

        if (docSnap.exists()) return <Response>{ ok: true, data: docSnap.data() }

        const baseUser: Usuario = {
            uid: user.uid,
            email: user.email || "",
            nombre: user.displayName || "",
            apellido: "",
            foto: user.photoURL || '',
            telefono: user.phoneNumber || '',
            rol: "Consulta",
            filled: true
        }

        await setDoc(doc(db, "users", user.uid), baseUser);

        return <Response>{
            ok: true,
            data: baseUser
        }

    } catch (e:any) {
        return <Response>{
            ok: false,
            msg: e.code,
        }
    }
}

export const loginWithEmailAndPassword = async (email: string, password: string):Promise<Response> => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if(docSnap.exists()) {
            return {
                ok: true,
                data: docSnap.data()
            }
        }else{
            return{
                ok: false,
                msg: "Contactese con el administrador",
            }
        }

    } catch (error: any) {
        return{
            ok: false,
            msg: error.code,
        }
    }
}

export const getUserByUid = async (uid: string) => {
    try {
        const docSnap = await getDoc(doc(db, "users", uid));
        if (docSnap.exists()) {
            return <Response>{
                ok: true,
                msg: '',
                data: docSnap.data()
            }
        } else {
            return <Response>{
                ok: false,
                msg: 'Ocurrio un error, comuniquese con el administrador',
                data: {}
            }
        }

    } catch (e: any) {
        return <Response>{
            ok: false,
            msg: e.code,
            data: {}
        }
    }
}