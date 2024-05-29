import {useState} from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../core/service/firebase";
import {IUser} from "../../../core/types/User";
import {collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import {getToday} from "../../utils/utils";
import {IAttendanceEntry} from "../../../core/types/AttendanceEntry";
import {IAttendanceList} from "../../../core/types/AttendanceList";

type IUseAuthReturn = {
    isLoading: boolean,
    user?: IUser,
    createUser(displayName: string, email: string, password: string, timecode: string | null): void,
    logUserIn(email: string, password: string, timecode: string | null): void
}

export const useAuth = (): IUseAuthReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>()

    // Path to the users collection in the database
    const usersRef = collection(db, "users");
    const attendanceListsRef = collection(db, "attendance-lists");

    const createUser = (displayName: string, email: string, password: string, timecode: string | null) => {
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

    const logUserIn = (email: string, password: string, timecode: string | null) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((_) => {
                // Search for user by email
                const q = query(usersRef, where("email", "==", email));
                getDocs(q)
                    .then((querySnapshot) => {
                        const user = querySnapshot.docs[0].data() as IUser;
                        setUser(user);

                        return user.userId;
                    })
                    .then((userId) => {
                        const today = getToday();
                        const todayList = doc(attendanceListsRef, today);
                        getDoc(todayList)
                            .then((docSnap) => {
                                if (docSnap.exists()) {
                                    const attendanceList = docSnap.data() as IAttendanceList
                                    const activeCode = attendanceList.activeCode;
                                    const attendanceEntriesList = attendanceList.attendees

                                    // eslint-disable-next-line eqeqeq
                                    if (activeCode == timecode) {
                                        const newAttendanceEntry: IAttendanceEntry = {
                                            userId: userId,
                                            clockIn: new Date(),
                                            clockOut: null
                                        }

                                        if (!attendanceEntriesList.includes(newAttendanceEntry)) {
                                            attendanceEntriesList.push(newAttendanceEntry);
                                        }
                                    }

                                    updateDoc(todayList, "attendees", attendanceEntriesList)
                                        .then(() => {
                                            console.log("Usuário adicionado à lista com sucesso!");
                                        })
                                }
                            })

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