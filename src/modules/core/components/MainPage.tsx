import React, {useEffect, useState} from "react";
import "./MainPage.css";

import {UserContextType} from "../types/User";
import {UserContext} from "../context/userContext";

import UserAuth from "../../user-auth/components/UserAuth";
import AttendanceAndSchedules from "../../attendance-schedule/components/AttendanceAndSchedules";

const MainPage = () => {
    const {
        globalUser
    } = React.useContext(UserContext) as UserContextType

    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        if (globalUser?.userId !== "") {
            setIsUserLogged(true);
        }
    }, [globalUser])

    return (
        <main>
            {isUserLogged ? (
                <AttendanceAndSchedules/>
            ) : (
                <UserAuth/>
            )}
        </main>
    );
};

export default MainPage;