import React from "react";

import "./ScheduleLine.css";

import {ISchedule} from "../../../../core/types/Schedule";

import HoursDropdown from "../dropdown/HoursDropdown";
import WeekDaysDropdown from "../dropdown/WeekDaysDropdown";

type ScheduleLineProps = {
    schedule: ISchedule
    onChange: (schedule: ISchedule) => void
}

const ScheduleLine = ({schedule, onChange}: ScheduleLineProps) => {
    return (
        <div className="schedule-line">
            <WeekDaysDropdown
                selectedDayOfWeek={schedule.dayOfWeek}
                onChange={(dayOfWeek) => onChange({...schedule, dayOfWeek})}
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