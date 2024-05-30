import React, {useCallback, useEffect, useReducer} from "react";

import "./ScheduleTable.css";

import {ISchedule} from "../../../core/types/Schedule";

import Card from "../card/Card";
import ScheduleLine from "./schedule-line/ScheduleLine";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import IconButton from "../../../core/components/icon-btn/IconButton";
import { UserContext } from "../../../core/context/userContext";
import {UserContextType} from "../../../core/types/User";
import { useUser } from "../../../core/hooks/user/useUser";
import { scheduleReducer } from "./schedule-reducer/scheduleReducer";

const addIcon = require("../../assets/icons/add.png");

const createNewSchedule = (scheduleList: ISchedule[]): ISchedule => {
    let nextDayOfWeek = 0;
    if (scheduleList.length > 0) {
        const lastDayOfWeek = scheduleList[scheduleList.length - 1].dayOfWeek;
        nextDayOfWeek = (lastDayOfWeek + 1) % 5;
    }

    while (scheduleList.some(s => s.dayOfWeek === nextDayOfWeek)) {
        nextDayOfWeek = (nextDayOfWeek + 1) % 5;
    }

    return {
        dayOfWeek: nextDayOfWeek,
        fromTime: "08:00",
        toTime: "12:00"
    }
}

const ScheduleTable = () => {
    const {
        globalUser,
        setGlobalUser
    } = React.useContext(UserContext) as UserContextType;
    const {
        updateUserSchedule
    } = useUser();

    const getScheduleList = useCallback(() => {
        if (globalUser === null || globalUser.schedule === "not initialized") return [];
        return globalUser.schedule;
    }, [globalUser])

    // const [scheduleList, setScheduleList] = useState<ISchedule[]>(getScheduleList);
    const [scheduleList, dispatch] = useReducer(scheduleReducer, []);

    useEffect(() => {
        dispatch({type: "REPLACE-ALL", payload: getScheduleList()});
    }, [getScheduleList]);

    const handleScheduleChange = useCallback((schedule: ISchedule) => {
        dispatch({type: "UPDATE", payload: schedule});
    }, []);

    const handleAddSchedule = () => {
        if (scheduleList.length < 5) {
            const newSchedule = createNewSchedule(scheduleList);
            dispatch({type: "ADD", payload: newSchedule});
        }
    }

    const handleRemoveSchedule = (dayOfWeek: number) => {
        const scheduleToRemove = (scheduleList as ISchedule[]).find(s => s.dayOfWeek === dayOfWeek);
        if (scheduleToRemove) {
            dispatch({type: "REMOVE", payload: scheduleToRemove});
        }
    }

    const handleSaveSchedule = useCallback(() => {
        if (globalUser === null) return;
        setGlobalUser((prevUser) => {
            return {
                ...prevUser,
                schedule: scheduleList
            }
        });
        // eslint-disable-next-line
    }, [globalUser, scheduleList]);

    useEffect(() => {
        if (globalUser === null) return;
        updateUserSchedule(globalUser);
    }, [globalUser, updateUserSchedule]);

    return (
        <Card>
            <span className="card-title">Como serão seus horários?</span>

            {(scheduleList as ISchedule[]).map((schedule) => {
                return <ScheduleLine
                    key={schedule.dayOfWeek}
                    schedule={schedule}
                    scheduleList={scheduleList}
                    onChange={(updatedSchedule) => handleScheduleChange(updatedSchedule)}
                    onRemove={() => handleRemoveSchedule(schedule.dayOfWeek)}
                />
            })}

            <span className="spacer"></span>

            <IconButton
                icon={addIcon}
                alt={"Novo horário"}
                title={"Novo Horário"}
                onClick={handleAddSchedule}
                className="add-schedule-btn"
            />
            <FilledButton
                title="Salvar"
                onClick={handleSaveSchedule}
            />
        </Card>
    );
};

export default ScheduleTable;