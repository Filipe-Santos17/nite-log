import {useState} from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";
// @ts-ignore
import {User} from "../models/User.ts";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User>();

    const createUser = (username: string, email: string, password: string) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((_) => {
                const user = new User(username, email);
                setUser(user);
                // add user to database and to attendees list
            })
            .then(() => {
                alert("Conta criada com sucesso!");
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
            })
            .then(() => {
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
        login: logUserIn
    };
}