import React, {useState} from "react";

import "./AttendanceAndSchedules.css";

import AttendanceHeader from "./header/AttendanceHeader";
import AttendanceTracker from "./attendance-tracker/AttendanceTracker";
import ScheduleTable from "./ScheduleTable/ScheduleTable";

const AttendanceAndSchedules = () => {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

    const handleUserIconClick = () => {
        setIsSideDrawerOpen(!isSideDrawerOpen);
    }

    return (
        <section className="attendance-schedules">
            <AttendanceHeader onClick={handleUserIconClick}/>

            <AttendanceTracker/>

            <ScheduleTable />
        </section>
    );
};

export default AttendanceAndSchedules;