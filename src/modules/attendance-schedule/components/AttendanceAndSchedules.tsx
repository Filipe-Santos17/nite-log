import React from "react";

import "./AttendanceAndSchedules.css";

import AttendanceHeader from "./header/AttendanceHeader";
import AttendanceTracker from "./attendance-tracker/AttendanceTracker";
import ScheduleTable from "./ScheduleTable/ScheduleTable";

const AttendanceAndSchedules = () => {
    return (
        <section className="attendance-schedules">
            <AttendanceHeader />

            <AttendanceTracker/>

            <ScheduleTable />
        </section>
    );
};

export default AttendanceAndSchedules;