import React from "react";

import "./ScheduleLine.css";

import {ISchedule} from "../../../../core/types/Schedule";

import HoursDropdown from "../dropdown/HoursDropdown";
import WeekDaysDropdown from "../dropdown/WeekDaysDropdown";

const closeIcon = require("../../../assets/icons/close.png");

type ScheduleLineProps = {
    schedule: ISchedule,
    scheduleList: ISchedule[],
    onChange: (schedule: ISchedule) => void,
    onRemove: (schedule: ISchedule) => void
}

const ScheduleLine = ({schedule, scheduleList, onChange, onRemove}: ScheduleLineProps) => {
    const handleRemove = () => {
        if (window.confirm("Tem certeza que deseja remover este horário?")) {
            onRemove(schedule);
        }
    }

    return (
        <div className="schedule-line">
            <img
                className="remove-icon"
                src={closeIcon}
                alt="Remover horário"
                onClick={handleRemove}
            />
            <WeekDaysDropdown
                selectedDayOfWeek={schedule.dayOfWeek}
                onChange={(dayOfWeek) => onChange({...schedule, dayOfWeek})}
                daysInUse={scheduleList.map(schedule => schedule.dayOfWeek)}
            />
            <HoursDropdown
                selectedHour={schedule.fromTime}
                onChange={(fromTime) => onChange({...schedule, fromTime})}
            />
            <HoursDropdown
                hoursValidFrom={schedule.fromTime}
                selectedHour={schedule.toTime}
                onChange={(toTime) => onChange({...schedule, toTime})}
            />
        </div>
    );
};

export default ScheduleLine;