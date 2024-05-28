import {useState} from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../service/firebase";
import {IUser} from "../../types/User";
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";

type IUseAuthReturn = {
    isLoading: boolean,
    user?: IUser,
    createUser(displayName: string, email: string, password: string): void,
    logUserIn(email: string, password: string): void
}

export const useAuth = (): IUseAuthReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>()

    // Path to the users collection in the database
    const usersRef = collection(db, "users");

    const createUser = (displayName: string, email: string, password: string) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Create user object with userId from firebase
                const firebaseUser = userCredential.user;
                const user: IUser = {
                    displayName: displayName,
                    email: email,
                    schedule: "not initialized",
                    userId: firebaseUser.uid
                }
                setUser(user);
                return user;
            })
            .then((user) => {
                // Save user to database
                addDoc(usersRef, user)
                    .then(() => {
                        alert("Conta criada com sucesso!");
                    })
                    .catch((error) => {
                        alert("Erro ao criar conta: " + error.message);
                    });

                // TODO: add user to attendance list
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
                // Search for user by email
                const q = query(usersRef, where("email", "==", email));
                getDocs(q)
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const user = doc.data() as IUser;
                            setUser(user);

                            // TODO: add user to attendance list
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
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