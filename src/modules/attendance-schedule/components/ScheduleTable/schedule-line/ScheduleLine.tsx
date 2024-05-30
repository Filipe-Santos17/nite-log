import React from "react";

import "./ScheduleLine.css";

import {ISchedule} from "../../../../core/types/Schedule";

import HoursDropdown from "../dropdown/HoursDropdown";
import WeekDaysDropdown from "../dropdown/WeekDaysDropdown";
import {DayOfWeek} from "../../../../core/types/DayOfWeek";

const closeIcon = require("../../../assets/icons/close.png");

type ScheduleLineProps = {
    schedule: ISchedule,
    scheduleList: ISchedule[],
    onChange: (schedule: ISchedule, dayOfWeek: DayOfWeek) => void,
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
                onChange={(newDayOfWeek) => onChange({...schedule, dayOfWeek: newDayOfWeek}, schedule.dayOfWeek)}
                daysInUse={scheduleList.map(schedule => schedule.dayOfWeek)}
            />
            <HoursDropdown
                selectedHour={schedule.fromTime}
                onChange={(fromTime) => onChange({...schedule, fromTime}, schedule.dayOfWeek)}
            />
            <HoursDropdown
                hoursValidFrom={schedule.fromTime}
                selectedHour={schedule.toTime}
                onChange={(toTime) => onChange({...schedule, toTime}, schedule.dayOfWeek)}
            />
        </div>
    );
};

export default ScheduleLine;