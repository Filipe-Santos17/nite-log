import React from "react";

import "./AttendanceTracker.css";

import Card from "../card/Card";
import FilledButton from "../../../core/components/filled-btn/FilledButton";

import {useAttendance} from "../../../user-auth/hooks/attendance/useAttendance";
import {UserContextType} from "../../../core/types/User";
import { UserContext } from "../../../core/context/userContext";

const greenCheck = require("../../assets/icons/green-check.png");

const AttendanceTracker = () => {
    const {
        globalUser
    } = React.useContext(UserContext) as UserContextType;

    const {
        removeUserFromAttendanceList
    } = useAttendance();

    const handleEndAttendance = () => {
        if (globalUser === null) return;
        if (window.confirm("Quer assinar sua saída da lista?")) {
            removeUserFromAttendanceList(globalUser.userId);
        }
    }

    return (
        <Card>
            <span className="entry-okay">Entrada registrada.</span>
            <img src={greenCheck} alt="Green check" className="green-check"/>
            <FilledButton
                title="Encerrar"
                onClick={handleEndAttendance}
            />
        </Card>
    );
};

export default AttendanceTracker;