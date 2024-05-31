import {useState} from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../core/service/firebase";
import {IUser} from "../../../core/types/User";
import {useAttendance} from "../attendance/useAttendance";
import {useUser} from "../../../core/hooks/user/useUser";

type useAuthReturn = {
    isLoading: boolean,
    user?: IUser,
    createUser(displayName: string, email: string, password: string, activeCode: string | null): void,
    logUserIn(email: string, password: string, activeCode: string | null): void
}

export const useAuth = (): useAuthReturn => {
    const {
        addUserToAttendanceList,
    } = useAttendance();
    const {
        addUserToDatabase,
        getUserFromDatabase
    } = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>()

    const createUser = async (displayName: string, email: string, password: string, activeCode: string | null) => {
        setIsLoading(true);

        const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        addUserToDatabase(firebaseUser, displayName, email)
            .then((user) => {
                setUser(user);
                addUserToAttendanceList(activeCode, user.userId);
            })
            .catch((error) => {
                alert("Erro ao criar conta: " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const logUserIn = async (email: string, password: string, activeCode: string | null) => {
        setIsLoading(true);

        await signInWithEmailAndPassword(auth, email, password);

        getUserFromDatabase(email)
            .then((user) => {
                setUser(user);
                addUserToAttendanceList(activeCode, user.userId);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
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