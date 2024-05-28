import React from "react";

import "./ScheduleLine.css";

import {ISchedule} from "../../../../core/types/Schedule";
import {DayOfWeek, getDayOfWeek} from "../../../../core/types/DayOfWeek";
import HoursDropdown from "../HoursDropdown/HoursDropdown";

type ScheduleLineProps = {
    schedule: ISchedule
    onChange: (schedule: ISchedule) => void
}

const ScheduleLine = ({schedule, onChange}: ScheduleLineProps) => {
    const dayOfWeek: string = getDayOfWeek(schedule.dayOfWeek as DayOfWeek);

    return (
        <div className="schedule-line">
            <span>{dayOfWeek}</span>
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