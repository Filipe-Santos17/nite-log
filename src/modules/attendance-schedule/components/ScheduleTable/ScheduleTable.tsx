import React, {useState} from "react";

import "./ScheduleTable.css";

import Card from "../card/Card";
import {ISchedule} from "../../../core/types/Schedule";
import ScheduleLine from "./ScheduleLine/ScheduleLine";
import FilledButton from "../../../core/components/filled-btn/FilledButton";

const defaultScheduleList: ISchedule[] = [
    {
        dayOfWeek: 0,
        fromTime: "08:00",
        toTime: "12:00"
    },
    {
        dayOfWeek: 1,
        fromTime: "08:00",
        toTime: "12:00"
    },
    {
        dayOfWeek: 2,
        fromTime: "08:00",
        toTime: "12:00"
    },
    {
        dayOfWeek: 3,
        fromTime: "08:00",
        toTime: "12:00"
    },
    {
        dayOfWeek: 4,
        fromTime: "08:00",
        toTime: "12:00"
    }
]

const ScheduleTable = () => {
    const [scheduleList, setScheduleList] = useState<ISchedule[]>(defaultScheduleList)

    const handleScheduleChange = (index: number, schedule: ISchedule) => {
        setScheduleList((prevScheduleList) => {
            const newScheduleList = [...prevScheduleList];
            newScheduleList[index] = schedule;
            return newScheduleList;
        })
    }

    // TODO: Implement the logic to save the scheduleList in the database

    return (
        <Card>
            <span className="card-title">Como serão seus horários?</span>

            {scheduleList.map((schedule, index) => {
                return <ScheduleLine
                    key={index}
                    schedule={schedule}
                    onChange={(updatedSchedule) => handleScheduleChange(index, updatedSchedule)}
                />
            })}

            <span className="spacer"></span>

            <FilledButton title="Confirmar"/>
        </Card>
    );
};

export default ScheduleTable;