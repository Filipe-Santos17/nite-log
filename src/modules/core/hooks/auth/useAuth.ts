import {useState} from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase";
import { IUser } from "../../types/User";

interface IUseAuthReturn {
    isLoading: boolean,
    user: IUser | undefined,
    createUser(displayName: string, email: string, password: string): void,
    logUserIn(email: string, password: string): void
}

export const useAuth = (): IUseAuthReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();

    const createUser = (displayName: string, email: string, password: string) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((_) => {
                // User is created and userState is set to it.
                const user: IUser = {
                    displayName: displayName,
                    email: email,
                    schedule: undefined,
                    userId: ""
                }
                setUser(user);
                alert("Conta criada com sucesso!");
                // TODO: add user to database and to attendees list
            })
            .catch((error) => {
                alert("Erro ao criar conta: " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const logUserIn = (email: string, password: string) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((_) => {
                // get user from database
                // do stuff with user
                alert("Login realizado com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao realizar login: " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return {
        isLoading,
        user,
        createUser,
        logUserIn
    };
}