import React, {useState} from "react";

import "./ScheduleTable.css";

import {ISchedule} from "../../../core/types/Schedule";

import Card from "../card/Card";
import ScheduleLine from "./schedule-line/ScheduleLine";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import IconButton from "../../../core/components/icon-btn/IconButton";

const addIcon = require("../../assets/icons/add.png");

const ScheduleTable = () => {
    const [scheduleList, setScheduleList] = useState<ISchedule[]>([])

    const handleScheduleChange = (index: number, schedule: ISchedule) => {
        setScheduleList((prevScheduleList) => {
            const newScheduleList = [...prevScheduleList];
            newScheduleList[index] = schedule;
            return newScheduleList;
        })
    }

    const handleAddSchedule = () => {
        if (scheduleList.length < 5) {
            let nextDayOfWeek = 0;
            if (scheduleList.length > 0) {
                const lastDayOfWeek = scheduleList[scheduleList.length - 1].dayOfWeek;
                nextDayOfWeek = (lastDayOfWeek + 1) % 5;
            }

            const newSchedule: ISchedule = {
                dayOfWeek: nextDayOfWeek,
                fromTime: "08:00",
                toTime: "12:00"
            }

            setScheduleList(prevScheduleList => [
                ...prevScheduleList,
                newSchedule
            ])
        }
    }

    const handleRemoveSchedule = (scheduleToRemove: ISchedule) => {
        setScheduleList(prevScheduleList => prevScheduleList.filter(s => s !== scheduleToRemove));
    }

    // TODO: Implement the logic to save the scheduleList in the database

    return (
        <Card>
            <span className="card-title">Como serão seus horários?</span>

            {scheduleList.map((schedule, index) => {
                return <ScheduleLine
                    key={index}
                    schedule={schedule}
                    scheduleList={scheduleList}
                    onChange={(updatedSchedule) => handleScheduleChange(index, updatedSchedule)}
                    onRemove={handleRemoveSchedule}
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
            <FilledButton title="Salvar"/>
        </Card>
    );
};

export default ScheduleTable;