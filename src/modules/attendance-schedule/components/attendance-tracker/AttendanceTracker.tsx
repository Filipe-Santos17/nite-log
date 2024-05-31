import React, {useEffect, useState} from "react";

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
        removeUserFromAttendanceList,
        checkTodayActiveCode
    } = useAttendance();

    const [isActiveCodeDefined, setIsActiveCodeDefined] = useState(true);
    const [isActiveCodeCorrect, setIsActiveCodeCorrect] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const activeCode = queryParams.get("activeCode");

        if (activeCode === null) {
            setIsActiveCodeDefined(false);
            return;
        }

        checkTodayActiveCode(activeCode)
            .then((isActiveCodeCorrect) => {
                setIsActiveCodeCorrect(isActiveCodeCorrect);
            });

    }, [checkTodayActiveCode]);

    const handleEndAttendance = () => {
        if (globalUser === null) return;
        if (window.confirm("Quer assinar sua saída da lista?")) {
            removeUserFromAttendanceList(globalUser.userId);
        }
    }

    if (!isActiveCodeDefined) {
        return (
            <Card>
                <span className="active-code-wrong-title">Opa!</span>
                <span className="active-code-wrong-text">
                    <p>
                       Parece que você não está no Nite no momento.
                    </p>
                    <p>
                       Caso esteja, escaneie o QR Code na entrada e tente novamente.
                    </p>
                    <p>
                       De qualquer forma, aproveite para nos contar mais sobre seus horários!
                    </p>
                </span>
            </Card>
        );
    }

    if (!isActiveCodeCorrect) {
        return (
            <Card>
                <span className="active-code-wrong-title">Código inválido</span>
                <span className="active-code-wrong-text">
                    <p>
                        O código que você escaneou não é válido para o dia de hoje.
                    </p>
                    <p>
                        Seu código pode ter expirado, por favor leia o QR Code novamente.
                    </p>
                </span>
            </Card>
        );
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